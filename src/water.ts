// The whole page's artwork: a night pool seen from the bottom, one fixed WebGL
// canvas. `phase` runs 0..3 with scroll (About, Where I've been, Work, Contact)
// and morphs one scene: caustics with pointer ripples, then lane streaks, then the
// gold rope bowing under the project arc, then the rope rising to the surface.
// One still frame per scroll step when motion is reduced. Returns a cleanup.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 res;
uniform float t, phase, act, dpr;
uniform vec2 mouse;

// Iterated domain warp: bright filaments where the warped field folds.
float caustic(vec2 p, float time) {
  vec2 i = p;
  float c = 1.0;
  for (int n = 0; n < 4; n++) {
    float tt = time * (1.0 - 3.5 / float(n + 1));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / 0.006), p.y / (cos(i.y + tt) / 0.006)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 9.0);
}

float band(float a, float b, float x) { return smoothstep(a, b, x); }

// Lane rope height (0 bottom .. 1 top) for this x, per section, plus the pointer's push.
float rope(float x, vec2 m) {
  float about = 0.075 + 0.016 * sin(x * 5.0 + t * 0.6) + 0.008 * sin(x * 11.0 - t * 0.9);
  float lanes = 0.15;
  float arc = 0.03 + 0.06 * pow(x - 0.5 * res.x / res.y, 2.0) / pow(0.5 * res.x / res.y, 2.0);
  float surface = 0.64 + 0.006 * sin(x * 7.0 + t * 0.5);
  float y = mix(about, lanes, band(0.35, 1.0, phase));
  y = mix(y, arc, band(1.75, 2.05, phase));
  y = mix(y, surface, band(2.75, 3.0, phase));
  float d = x - m.x;
  return y - 0.05 * act * exp(-d * d * 40.0) * sign(m.y - y + 0.0001);
}

void main() {
  vec2 uv = gl_FragCoord.xy / res.y;
  vec2 m = mouse / res.y;
  float aspect = res.x / res.y;

  // Pointer ripples, only while the pointer moves.
  vec2 d = uv - m;
  float r = length(d);
  uv += (d / (r + 1e-4)) * 0.01 * act * sin(48.0 * r - t * 5.0) * exp(-r * 5.5);

  // Where I've been: the light stretches into horizontal lane streaks that drift.
  float lane = band(0.3, 1.0, phase) * (1.0 - band(1.75, 2.1, phase));
  vec2 cp = uv;
  cp.x = mix(cp.x, cp.x * 0.22 + t * 0.03, lane);
  cp.y = mix(cp.y, cp.y * 1.6, lane);
  float light = caustic(cp * 6.2832 * 1.6 - 250.0, t * 0.22 + 23.0);
  light = clamp(light, 0.0, 1.0);

  // Depth: brighter toward the surface (top), darker at the floor; contact dims.
  float surfaceGlow = mix(0.55, 1.0, gl_FragCoord.y / res.y);
  float dim = 1.0 - 0.6 * band(2.75, 3.0, phase);
  vec3 deep = vec3(0.027, 0.043, 0.063);
  vec3 water = vec3(0.059, 0.094, 0.125);
  vec3 col = mix(deep, water, surfaceGlow * 0.8);
  col += vec3(0.62, 0.76, 0.82) * light * 0.34 * surfaceGlow * dim;

  // Snell's window: looking up, the surface is a brighter disc overhead.
  vec2 w = (gl_FragCoord.xy - vec2(0.5 * res.x, 1.15 * res.y)) / res.y;
  col += vec3(0.09, 0.13, 0.16) * (1.0 - smoothstep(0.35, 1.05, length(w))) * dim;

  // Vignette, as if looking up through the water column.
  vec2 q = gl_FragCoord.xy / res - 0.5;
  col *= 1.0 - 0.55 * dot(q, q);

  // Lane rope: a string of rounded floats in two golds, each lit from above with
  // a soft shadow on the water below it; brighter near the pointer.
  float y = rope(uv.x, m);
  float px = (uv.y - y) * res.y / dpr;
  float xs = uv.x * res.y / dpr / 22.0;
  vec2 b = vec2((fract(xs) - 0.5) * 22.0, px);
  float e = length(b / vec2(9.0, 3.6));
  float bead = 1.0 - band(0.75, 1.0, e);
  vec2 h = b - vec2(-2.0, 1.4);
  float lit = 0.55 + 0.45 * band(-3.6, 3.6, px) + 0.5 * exp(-dot(h, h) * 0.35);
  float alt = mod(floor(xs), 3.0) < 1.0 ? 0.6 : 1.0;
  float shadow = exp(-pow((px + 6.0) / 3.5, 2.0)) * 0.35;
  float glow = exp(-abs(px) * 0.2) * 0.12;
  float near = 1.0 + 0.8 * exp(-pow(uv.x - m.x, 2.0) * 30.0);
  vec3 gold = vec3(0.784, 0.643, 0.388);
  col *= 1.0 - shadow * (1.0 - bead);
  col = mix(col, gold * lit * alt * near, bead * 0.92);
  col += gold * glow * near * 0.6;

  // Fine grain against banding on the dark gradient.
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`

export function startWater(canvas: HTMLCanvasElement, animate: boolean, phaseOf: () => number): () => void {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return () => {} // the CSS background on the canvas stands in

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {}
  gl.useProgram(prog)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u = (n: string) => gl.getUniformLocation(prog, n)
  const [uRes, uT, uPhase, uAct, uDpr, uMouse] = ['res', 't', 'phase', 'act', 'dpr', 'mouse'].map(u)

  // ponytail: DPR capped at 1; the light is soft, so more pixels buy nothing visible.
  let dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1)
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uDpr, dpr)
  }

  // Pointer: eased position, and an activity level that rises with movement and decays.
  const target = { x: innerWidth * 0.62, y: innerHeight * 0.4 }
  const m = { ...target }
  let act = 0
  let lastMove = 0
  const onMove = (e: PointerEvent) => {
    target.x = e.clientX
    target.y = e.clientY
    lastMove = performance.now()
  }
  addEventListener('pointermove', onMove, { passive: true })

  const draw = (ms: number) => {
    m.x += (target.x - m.x) * 0.08
    m.y += (target.y - m.y) * 0.08
    act += ((performance.now() - lastMove < 120 ? 1 : 0) - act) * 0.04
    gl.uniform1f(uT, ms / 1000)
    gl.uniform1f(uPhase, phaseOf())
    gl.uniform1f(uAct, animate ? act : 0)
    gl.uniform2f(uMouse, m.x * dpr, canvas.height - m.y * dpr)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  let raf = 0
  const loop = (ms: number) => {
    draw(ms)
    raf = requestAnimationFrame(loop)
  }
  const still = () => draw(9000)
  const ro = new ResizeObserver(() => {
    resize()
    if (!animate) still()
  })
  ro.observe(canvas)
  resize()
  if (animate) raf = requestAnimationFrame(loop)
  else {
    still()
    addEventListener('scroll', still, { passive: true })
  }

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    removeEventListener('pointermove', onMove)
    removeEventListener('scroll', still)
  }
}
