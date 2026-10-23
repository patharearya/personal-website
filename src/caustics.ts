// Pool-floor caustics: a live fragment shader behind ABOUT ME (direction raise from
// the shader portal). Light lines are the edges of animated Worley cells, two
// layers at different scales. Renders only while on screen; one still frame when
// motion is reduced. Returns a cleanup function.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision mediump float;
uniform vec2 res;
uniform float t;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// Distance between nearest and second-nearest moving cell points: small on cell edges.
float edge(vec2 uv, float speed) {
  vec2 cell = floor(uv), f = fract(uv);
  float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = hash(cell + g);
    o = 0.5 + 0.42 * sin(t * speed + 6.2831 * o);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return d2 - d1;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res.y;
  // Gentle swell so the network never looks like a static mesh.
  uv += 0.04 * vec2(sin(uv.y * 3.0 + t * 0.4), cos(uv.x * 2.5 + t * 0.33));
  float a = 1.0 - smoothstep(0.0, 0.11, edge(uv * 4.2, 0.55));
  float b = 1.0 - smoothstep(0.0, 0.09, edge(uv * 7.3 + 3.1, 0.8));
  float light = pow(a, 2.2) * 0.9 + pow(b, 2.6) * 0.45;
  vec3 deep = vec3(0.70, 0.82, 0.92);
  vec3 floorTone = vec3(0.84, 0.91, 0.96);
  float depth = 0.5 + 0.5 * sin(uv.x * 0.9 + uv.y * 0.6 + t * 0.1);
  vec3 col = mix(deep, floorTone, depth);
  col = mix(col, vec3(1.0), clamp(light, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`

export function startCaustics(canvas: HTMLCanvasElement, animate: boolean): () => void {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
  if (!gl) return () => {} // CSS background on the canvas stands in

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
  const uRes = gl.getUniformLocation(prog, 'res')
  const uT = gl.getUniformLocation(prog, 't')

  // ponytail: DPR capped at 1.25; the pattern is soft, so more pixels buy nothing visible.
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
  }
  const draw = (ms: number) => {
    gl.uniform1f(uT, ms / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  let raf = 0
  let visible = false
  const loop = (ms: number) => {
    draw(ms)
    raf = visible ? requestAnimationFrame(loop) : 0
  }
  const ro = new ResizeObserver(() => {
    resize()
    if (!animate || !visible) draw(4000)
  })
  ro.observe(canvas)
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (animate && visible && !raf) raf = requestAnimationFrame(loop)
  })
  io.observe(canvas)
  resize()
  draw(4000)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
  }
}
