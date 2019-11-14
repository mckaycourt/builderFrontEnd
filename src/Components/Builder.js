import React, {Component} from 'react';

class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: -1,
            font: 50,
            texts: [],
            fontIndex: 0,
            fonts: ['verdana', 'Arial', 'Helvetica'],
            imageIndex: 0,
            images: [
                'https://cdnl.sanmar.com/imglib/mresjpg/2017/f4/29M_californiablue_model_front_032017.jpg',
                'https://cdnl.sanmar.com/imglib/mresjpg/2017/f4/29M_forestgreen_model_front_032017.jpg',
                'https://cdnl.sanmar.com/imglib/mresjpg/2017/f4/29M_navy_model_front_032017.jpg',
            ]
        }
    }

    componentDidMount() {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.src = this.props.image;
        let $canvas = document.querySelector("#canvas");
        let offsetX = $canvas.offsetLeft;
        let offsetY = $canvas.offsetTop;
        let scrollX = $canvas.scrollLeft;
        let scrollY = $canvas.scrollTop;
        let startX;
        let startY;

        img.onload = () => {
            canvas.width = img.width / 2 + 20;
            canvas.height = img.height / 2 + 20;
            canvas.border = '1px black solid';
            this.setState({
                canvas,
                ctx,
                img,
                offsetX,
                offsetY,
                scrollX,
                scrollY,
                startX,
                startY,
            }, () => this.draw())
        }
    }

    draw = () => {
        if (this.state.ctx) {
            this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
            this.state.ctx.drawImage(this.state.img, 10, 10, this.state.img.width / 2, this.state.img.height / 2);
            for (let i = 0; i < this.state.texts.length; i++) {
                let text = this.state.texts[i];
                text.height = this.state.font;
                text.width = this.state.ctx.measureText(text.text).width;
                if (text.fillStyle) {
                    this.state.ctx.fillStyle = text.fillStyle;
                }
                this.state.ctx.fillText(text.text, text.x, text.y);
            }
        }
    };

    textHittest = (x, y, textIndex) => {
        let text = this.state.texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    };

    handleMouseDown = (e) => {
        console.log('mouse down');
        e.preventDefault();
        this.setState({
            startX: parseInt(e.clientX - this.state.offsetX),
            startY: parseInt(e.clientY - this.state.offsetY)
        }, () => {
            for (let i = 0; i < this.state.texts.length; i++) {
                if (this.textHittest(this.state.startX, this.state.startY, i)) {
                    this.setState({
                        selectedText: i
                    })
                }
            }
        })
    };

    handleMouseUp = (e) => {
        e.preventDefault();
        this.setState({
            selectedText: -1,
        });
    };

    handleMouseOut = (e) => {
        e.preventDefault();
        this.setState({
            selectedText: -1,
        });
    };

    handleMouseMove = (e) => {
        e.preventDefault();
        let texts = this.state.texts;
        let index = this.state.selectedText;

        this.setState({
            moveX: parseInt(e.clientX - this.state.offsetX),
            moveY: parseInt(e.clientY - this.state.offsetY)
        }, () => {
            let found = false;
            for (let i = 0; i < this.state.texts.length; i++) {
                if (this.state.moveY > this.state.texts[i].y - this.state.texts[i].height && this.state.moveY < this.state.texts[i].y && this.state.moveX > this.state.texts[i].x && this.state.moveX < this.state.texts[i].x + this.state.texts[i].width) {
                    // texts[i].fillStyle = 'red';
                    found = true;
                    this.setState({
                        texts,
                    }, () => this.draw())
                }
            }
            if (!found) {
                let texts = this.state.texts;
                for (let text of texts) {
                    // text.fillStyle = 'black';
                }
                this.setState({
                    texts,
                }, () => this.draw())
            }
        });

        if (this.state.selectedText < 0) {
            return;
        }
        let mouseX = parseInt(e.clientX - this.state.offsetX);
        let mouseY = parseInt(e.clientY - this.state.offsetY);

        let dx = mouseX - this.state.startX;
        let dy = mouseY - this.state.startY;
        this.setState({
            startX: mouseX,
            startY: mouseY,
        });

        texts[index].x += dx;
        texts[index].y += dy;
        this.setState({
            texts
        });
        this.draw();
    };

    submit = () => {

        let y = this.state.texts.length * 20 + 20;

        let text = {
            text: document.querySelector("#theText").value,
            x: 100,
            y: y + 100,
            fillStyle: 'black'
        };

        let ctx = this.state.ctx;
        ctx.font = "50px verdana";
        let font = 50;
        text.width = ctx.measureText(text.text).width;
        text.height = font;
        let texts = this.state.texts;
        texts.push(text);

        this.setState({
            ctx,
            font,
            texts
        });

        this.draw();
    };

    increaseFont = () => {
        let ctx = this.state.ctx;
        let font = this.state.font + 10;
        ctx.font = `${font}px ${this.state.fonts[this.state.fontIndex]}`;
        let fontIndex = this.state.fontIndex + 1;
        if (fontIndex > this.state.fonts.length) {
            fontIndex = 0;
        }
        this.setState({
            ctx,
            fontIndex,
            font
        }, () => this.draw())
    };

    decreaseFont = () => {
        let ctx = this.state.ctx;
        let font = this.state.font - 10;
        ctx.font = `${font}px verdana`;
        this.setState({
            ctx,
            font
        }, () => this.draw())
    };

    changeImage = () => {
        // let {images, imageIndex} = this.state;
        // let img = new Image();
        // imageIndex++;
        // if (imageIndex === images.length) {
        //     imageIndex = 0;
        // }
        // img.src = images[imageIndex];
        let img = new Image();
        img.src = this.props.image;
        img.onload = () =>
            this.setState({
                // imageIndex,
                img
            }, () => this.draw())
    };

    changeColor = (e) => {
        let color = e.target.value;
        let {texts} = this.state;
        for (let text of texts) {
            text.fillStyle = color;
        }
        this.setState({
            texts
        }, () => this.draw())
    };

    render() {
        return (
            <div>
                <input id="theText" type="text"/>
                <input id="color" type="color" onChange={this.changeColor}/>
                <button id="submit" onClick={this.submit}>Draw text on canvas</button>
                <button onClick={this.increaseFont}>Increase Font</button>
                <button onClick={this.decreaseFont}>Decrease Font</button>
                <br/>
                <canvas
                    id="canvas"
                    width='500'
                    height='350'
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    onMouseOut={this.handleMouseOut}
                />
            </div>
        );
    }
}

export default Builder;
