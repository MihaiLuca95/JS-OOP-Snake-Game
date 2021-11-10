class Component {
    constructor(x, y,  w, h, frames, key, rootElement) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.frames = frames
        this.key = key
        this.currentFrame = /*this.frames[Object.keys(this.frames)[0]] */  this.getFrame( this.key )
        this.rootElement = rootElement

        this.children = []
        this.render()
    }

    getFrame(key) {
        if(typeof key == 'string') {
            return this.frames[key]
         } else if (typeof key == 'number'){
            if (key > 0) {
                return this.frames[Object.keys(this.frames)[key-1]]
            } else {
                return this.frames[Object.keys(this.frames)[Object.keys(this.frames).length + key]]
            }
        }     
    }

    addChild(child) {
        if(child instanceof Component && !this.children.includes(child)) {
            this.children.push(child);
        }
    }

    removeChild(remChild) {
        if(child instanceof Component) {
            this.children.filter(elem => elem != remChild);
        }
    }

    render() {
        // nesting     ...=this
        let {x: xOffset, y: yOffset} = this.currentFrame

        let div = document.createElement('div')
            div.className = "component"
            div.style = `
               background-position: ${xOffset}px ${yOffset}px;
               top: ${this.y + 10}px;
               left: ${this.x + 10}px;
               `
        this.rootElement.appendChild(div)
    }
}

class SnakeHead extends Component {

}

class SnakeBody extends Component {

}

class SnakeTail extends Component {

}

class Snake extends Component {
    constructor(rootElement) {
        super(0, 0, 0, 0, { default: {x: 0, y: 0}}, 1, rootElement)

        //add the head 
        this.addChild(new SnakeHead(0, 128, 64, 64, {
            up:    { x: -192, y: 0 }, 
            right: { x: -256, y: 0 },
            down:  { x: -256, y: -64 },
            left:  { x: -192, y: -64 },
        }, 1, rootElement))

        // add the body
        this.addChild(new SnakeBody(0, 192, 64, 64, {
            tb: { x: -128, y: -64},
            lr: { x: -64, y: 0 },
            br: { x: 0, y: 0 }, 
            tl: { x: -128, y: -128 },
            lb: { x: -128, y: 0 },
            tr: { x: 0, y: -64 },
        }, 1,  rootElement))

        // add the tail
        this.addChild(new SnakeTail(0,256, 64, 64, {
            up:    { x: -192, y: -128 }, 
            right: { x: -256, y: -128 },
            down:  { x: -256, y: -192 },
            left:  { x: -192, y: -192 },
        }, 1, rootElement))
    }

    // overriding
    render() {}
}

class Apple extends Component {

}

class Map extends Component {
    render() {

        let div = document.createElement('div')
            div.style = `
               border: 10px solid black; 
               position: absolute;
               width: ${this.w}px; 
               height: ${this.h}px;
               background-image: linear-gradient(transparent 98%, black), linear-gradient(90deg, transparent 98%, black);
               background-size: 64px 64px;
               `
        this.rootElement.appendChild(div)
    }
}

///////////////////////////////////////////////////////////////////////////////////
let gameMap = new Map(0, 0, 640, 640, {default: {x: 0, y: 0}}, 1, window["map"])

gameMap.addChild(new Apple(128, 128, 64, 64, { 
    default: { x: 0, y: -192 }, 
}, 1, window["map"]))
gameMap.addChild(new Snake(window["map"]))

