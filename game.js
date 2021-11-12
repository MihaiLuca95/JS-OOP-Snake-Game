class Component {
    constructor(x, y,  w, h, frames, /*key,*/ rootElement) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.direction = "right"
        this.frames = frames
        // this.key = key
        this.currentFrame = /* this.frames[Object.keys(this.frames)[0]] */ this.getFrame( /*this.key*/ 1 )
        this.rootElement = rootElement

        this.children = []
        this.render()
    }

    update() {}

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

    // addChild(child) {
    //     if(child instanceof Component && !this.children.includes(child)) {
    //         this.children.push(child);
    //     }
    // }

    // removeChild(remChild) {
    //     if(child instanceof Component) {
    //         this.children.filter(elem => elem != remChild);
    //     }
    // }

    render() {
        let componentClassName = this.constructor.name // which class is this object from?

        let dirFrame = this.frames[this.direction]
        if(dirFrame) {
            this.currentFrame = dirFrame
        }

        let {x: xOffset, y: yOffset} = this.currentFrame

        // remember the LINK to the DOM element
        this.div = document.createElement('div')
            this.div.className = `component ${componentClassName}`
            this.div.style = `
               background-position: ${xOffset}px ${yOffset}px;
               top: ${this.y + 10}px;
               left: ${this.x + 10}px;
               `
        this.rootElement.appendChild(this.div)
    }
}

class SnakeHead extends Component {
    update(e) {
        
        if(e) {
            if(e.key == 'ArrowUp') {
                this.direction = 'up'
                console.log('When I press a tast:',this.currentFrame)
            } else if(e.key == 'ArrowRight') {
                this.direction = 'right'
                console.log('When I press a tast:',this.currentFrame)
            } else if(e.key == 'ArrowDown') {
                this.direction = 'down'
                console.log('When I press a tast:',this.currentFrame)
            } else if(e.key == 'ArrowLeft') {
                this.direction = 'left'
                console.log('When I press a tast:',this.currentFrame)
            }
        }

        if(this.direction == 'up') {
            this.y -= 64
            this.div.style.top = `${this.y+10}px`
        } else if(this.direction == 'right') {
            this.x += 64
            this.div.style.left = `${this.x+10}px`
        } else if(this.direction == 'down') {
            this.y += 64
            this.div.style.top = `${this.y+10}px`
        } else if(this.direction == 'left') {
            this.x -= 64
            this.div.style.left = `${this.x+10}px`
        }

        // Update the div inside DOM
        let dirFrame = this.frames[this.direction]
        if(dirFrame) {
            this.currentFrame = dirFrame
            console.log('>>>>', this.currentFrame)
        }
        let {x: xOffset, y: yOffset} = this.currentFrame
        this.div.style.backgroundPosition = `${xOffset}px ${yOffset}px;`
    }
}

class SnakeBody extends Component {
    update(e) {
        
        if(this.direction == 'up') {
            this.y -= 64
            this.div.style.top = `${this.y+10}px`
        } else if(this.direction == 'right') {
            this.x += 64
            this.div.style.left = `${this.x+10}px`
        }

        // Update the div inside DOM
        let dirFrame = this.frames[this.direction]
        if(dirFrame) {
            this.currentFrame = dirFrame
        }
        let {x: xOffset, y: yOffset} = this.currentFrame
        this.div.style.backgroundPosition = `${xOffset}px ${yOffset}px;`
    }
}

class SnakeTail extends Component {
    update(e) {
        
        if(this.direction == 'up') {
            this.y -= 64
            this.div.style.top = `${this.y+10}px`
        } else if(this.direction == 'right') {
            this.x += 64
            this.div.style.left = `${this.x+10}px`
        }

        // Update the div inside DOM
        let dirFrame = this.frames[this.direction]
        if(dirFrame) {
            this.currentFrame = dirFrame
        }
        let {x: xOffset, y: yOffset} = this.currentFrame
        this.div.style.backgroundPosition = `${xOffset}px ${yOffset}px;`
    }
}

class Snake extends Component {
    constructor(rootElement) {
        super(0, 0, 0, 0, { default: {x: 0, y: 0}},  rootElement)

        //add the head 
        this.children.push(new SnakeHead(0, 448, 64, 64, {
            up:    { x: -192, y: 0 }, 
            right: { x: -256, y: 0 },
            down:  { x: -256, y: -64 },
            left:  { x: -192, y: -64 },
        }, rootElement))

        //add the body
        // this.addChild(new SnakeBody(0, 512, 64, 64, {
        //     tb: { x: -128, y: -64},
        //     lr: { x: -64, y: 0 },
        //     br: { x: 0, y: 0 }, 
        //     tl: { x: -128, y: -128 },
        //     lb: { x: -128, y: 0 },
        //     tr: { x: 0, y: -64 },
        // }, 1,  rootElement))

        //add the tail
        // this.addChild(new SnakeTail(0,576, 64, 64, {
        //     up:    { x: -192, y: -128 }, 
        //     right: { x: -256, y: -128 },
        //     down:  { x: -256, y: -192 },
        //     left:  { x: -192, y: -192 },
        // }, 1, rootElement))
    }

    update(e) {
        for(let i = 0; i<this.children.length; i++) {
            this.children[i].update(e)
        }
    }

    // overriding
    render() {}
}

class Apple extends Component {

}

class Map extends Component {

    start() {
        
        document.body.addEventListener('keydown', this.update.bind(this))

        setInterval(() => {
            this.update()
        }, 1000)
    }

    update(e) {

        for(let i = 0; i<this.children.length; i++) {
            this.children[i].update(e)
        }
    }

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
let gameMap = new Map(0, 0, 640, 640, {default: {x: 0, y: 0}}, window["map"])

gameMap.children.push(new Apple(128, 128, 64, 64, { 
    default: { x: 0, y: -192 }, 
}, window["map"]))
gameMap.children.push(new Snake(window["map"]))

gameMap.start()

