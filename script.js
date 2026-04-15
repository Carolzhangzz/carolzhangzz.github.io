/**
 * Flowing geometric mesh background with mouse interaction.
 * Black wireframe nodes + connections on white, with floating polygons.
 */
(function () {
  const canvas = document.getElementById('geo-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let mouse = { x: -9999, y: -9999 };
  let time = 0;

  // ===== Particle mesh (original style, black on white) =====
  const NODES = [];
  const NODE_COUNT = 35;
  const CONNECT_DIST = 130;
  const MOUSE_RADIUS = 180;

  // ===== Floating wireframe shapes =====
  const SHAPES = [];
  const SHAPE_COUNT = 4;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes() {
    NODES.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      NODES.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
      });
    }
  }

  function initShapes() {
    SHAPES.length = 0;
    for (let i = 0; i < SHAPE_COUNT; i++) {
      SHAPES.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 15 + Math.random() * 45,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        sides: Math.floor(Math.random() * 3) + 3, // triangle, square, pentagon
      });
    }
  }

  function update() {
    time++;

    // Update nodes
    for (const n of NODES) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // Mouse repulsion
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        n.vx += (dx / dist) * force * 0.15;
        n.vy += (dy / dist) * force * 0.15;
      }
      n.vx *= 0.997;
      n.vy *= 0.997;
    }

    // Update shapes
    for (const s of SHAPES) {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;

      if (s.x < -60) s.x = W + 60;
      if (s.x > W + 60) s.x = -60;
      if (s.y < -60) s.y = H + 60;
      if (s.y > H + 60) s.y = -60;

      // Mouse push
      if (mouse.x > 0) {
        const dx = s.x - mouse.x, dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const push = (200 - dist) / 200;
          s.vx += (dx / dist) * push * 0.06;
          s.vy += (dy / dist) * push * 0.06;
          s.rotSpeed += push * 0.003;
        }
      }
      s.vx *= 0.998;
      s.vy *= 0.998;
      s.rotSpeed *= 0.998;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // ----- Draw connections between nodes -----
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const a = NODES[i], b = NODES[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          let alpha = (1 - dist / CONNECT_DIST) * 0.07;

          // Mouse proximity boost
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const mDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
          if (mDist < MOUSE_RADIUS) {
            alpha += (1 - mDist / MOUSE_RADIUS) * 0.15;
          }

          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // ----- Draw nodes -----
    for (const n of NODES) {
      const mDist = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
      const boost = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) : 0;

      ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + boost * 0.3})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + boost * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // ----- Draw floating wireframe polygons -----
    for (const s of SHAPES) {
      const mDist = mouse.x > 0
        ? Math.sqrt((s.x - mouse.x) ** 2 + (s.y - mouse.y) ** 2)
        : 999;
      const alpha = mDist < 250
        ? 0.06 + (250 - mDist) / 250 * 0.14
        : 0.06;

      // Outer polygon
      ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let j = 0; j <= s.sides; j++) {
        const angle = s.rotation + (j / s.sides) * Math.PI * 2;
        const px = s.x + Math.cos(angle) * s.size;
        const py = s.y + Math.sin(angle) * s.size;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Inner spokes to center
      ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.35})`;
      ctx.lineWidth = 0.5;
      for (let j = 0; j < s.sides; j++) {
        const angle = s.rotation + (j / s.sides) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(angle) * s.size, s.y + Math.sin(angle) * s.size);
        ctx.stroke();
      }

      // Center dot
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.5})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // ----- Connect nearby shapes to nodes (cross-layer links) -----
    for (const s of SHAPES) {
      for (const n of NODES) {
        const dx = s.x - n.x, dy = s.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.04;
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.lineWidth = 0.3;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initNodes(); initShapes(); });
  document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  initNodes();
  initShapes();
  loop();
})();
