# PHASE 1: ARCHITECTURE DECONSTRUCTION ANALYSIS

## 1. REACT STATE TO DOM STATE MAPPING

### React State Variables:
```typescript
const [activeLayer, setActiveLayer] = useState<Layer>(null);
const [isExploded, setIsExploded] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);
```

### Vanilla JS Equivalents:
```javascript
let activeLayer = null; // 'code' | 'blueprint' | 'ui' | null
let isExploded = false;
let containerElement = null;
```

## 2. FRAMER MOTION TO CSS/JS CONVERSION

### Motion Values & Springs:
```typescript
const x = useMotionValue(0);
const y = useMotionValue(0);
const mouseXSpring = useSpring(x);
const mouseYSpring = useSpring(y);
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [25, 15]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-25, -15]);
```

### Vanilla JS Equivalent:
```javascript
let mouseX = 0, mouseY = 0;
let currentRotateX = 20, currentRotateY = -20;
// Use requestAnimationFrame for smooth interpolation
```

## 3. COMPONENT HIERARCHY FLATTENING

### React Components:
- App (root)
  - Aurora (background)
  - IsometricHero (3D stack)
  - FeaturePill (interactive buttons)

### HTML Structure:
```html
<div class="app-container">
  <div class="aurora-bg"></div>
  <main class="main-content">
    <div class="content-section"></div>
    <div class="hero-section">
      <div class="isometric-container"></div>
    </div>
  </main>
</div>
```

## 4. EVENT HANDLERS MAPPING

### React Events:
```typescript
onMouseMove={handleMouseMove}
onMouseEnter={() => setIsExploded(true)}
onMouseLeave={() => setIsExploded(false)}
onHover={(active) => setActiveLayer(active ? 'code' : null)}
```

### Vanilla JS Events:
```javascript
element.addEventListener('mousemove', handleMouseMove);
element.addEventListener('mouseenter', () => isExploded = true);
element.addEventListener('mouseleave', () => isExploded = false);
```

## 5. ANIMATION STATES IDENTIFIED

### Critical Animations:
1. **3D Tilt Effect** - CSS transform + JS mouse tracking
2. **Layer Explosion** - CSS translateZ transitions
3. **Aurora Movement** - CSS keyframe animations
4. **Hover States** - CSS :hover + JS class toggles
5. **Text Glitch** - CSS pseudo-elements + animations

### Performance Targets:
- Mouse tracking: 60fps via requestAnimationFrame
- Layer transitions: CSS transitions (300ms)
- Aurora: CSS animations (20s+ duration)
