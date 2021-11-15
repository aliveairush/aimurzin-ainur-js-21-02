const createLoader = () => {
    const loaderBox = document.createElement('div');
    loaderBox.innerHTML = '<div id="loader">\n' +
        '            <div id="loader-box"></div>\n' +
        '        </div>'

    document.querySelector('.container-centered').prepend(loaderBox);
    moveVerticalAnimation();
    moveHorizontalAnimation();
}

const remove = () => {
    cancelAnimationFrame(horizontalAnimation);
    cancelAnimationFrame(verticalAnimation);
    document.getElementById("loader").parentElement.remove();
}

let horizontalAnimation;
let verticalAnimation;

function moveHorizontalAnimation() {
    const loaderBox = document.getElementById('loader-box')
    let loaderBoxLeftPos = Number.parseInt(getComputedStyle(loaderBox).left);

    let rotateZdeg = 0;

    const moveRight = () => {
        loaderBox.style.transform = `rotateZ(${rotateZdeg}deg)`
        rotateZdeg += 20;

        return requestAnimationFrame(() => {
            const containerWidth = Number.parseInt(getComputedStyle(loaderBox.parentElement).width);
            const loaderBoxWidth = Number.parseInt(getComputedStyle(loaderBox).width);

            if (loaderBoxLeftPos < containerWidth - loaderBoxWidth) {
                loaderBoxLeftPos += 3;
                loaderBox.style.left = `${loaderBoxLeftPos}px`;
                requestAnimationFrame(moveRight);
            } else {
                requestAnimationFrame(moveLeft)
            }
        });
    }
    horizontalAnimation = moveRight();

    const moveLeft = () => {
        loaderBox.style.transform = `rotateZ(${rotateZdeg}deg)`
        rotateZdeg -= 20;
        return requestAnimationFrame(() => {
            if (loaderBoxLeftPos >= 0) {
                loaderBoxLeftPos -= 3;
                loaderBox.style.left = `${loaderBoxLeftPos}px`
                requestAnimationFrame(moveLeft)
            } else {
                requestAnimationFrame(moveRight)
            }
        })
    }
}

function moveVerticalAnimation() {
    const loaderBox = document.getElementById('loader-box');
    if (loaderBox !== null) {

        let loaderBoxTopPos = Number.parseInt(getComputedStyle(loaderBox).top);
        verticalAnimation = moveBottom();

        function moveBottom() {
            return requestAnimationFrame(() => {
                const containerHeight = Number.parseInt(getComputedStyle(loaderBox.parentElement).height);
                const loaderBoxHeight = Number.parseInt(getComputedStyle(loaderBox).height);
                if (loaderBoxTopPos < containerHeight - loaderBoxHeight) {
                    loaderBoxTopPos += 3;
                    loaderBox.style.top = `${loaderBoxTopPos}px`

                    verticalAnimation = requestAnimationFrame(moveBottom)
                } else {
                    verticalAnimation = requestAnimationFrame(moveTop)
                }
            })
        }

        function moveTop() {
            return requestAnimationFrame(() => {
                if (loaderBoxTopPos >= 0) {
                    loaderBoxTopPos -= 3;
                    loaderBox.style.top = `${loaderBoxTopPos}px`
                    verticalAnimation = requestAnimationFrame(moveTop)
                } else {
                    verticalAnimation = requestAnimationFrame(moveBottom)
                }
            })
        }
    }
}


export const loader = {
    createLoader: createLoader,
    remove: remove
}

