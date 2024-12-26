function createAsteroids () {
    info.startCountdown(15)
    asteroidList = [assets.image`asteroid2`, assets.image`asteroid0`, assets.image`asteroid1`]
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(asteroidList._pickRandom(), randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.setPosition(30, 60)
    discovery.z = 10
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
    createAsteroids()
}
info.onCountdownEnd(function () {
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.Player)
    hubble.setPosition(140, 55)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    scroller.scrollBackgroundWithSpeed(0, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.setBackgroundImage(assets.image`kellyScreen`)
    game.showLongText("You successfully navigated Discovery to the Hubble telescope", DialogLayout.Bottom)
    game.showLongText("Mission Accomplished! Thank you for being part of my fist space flight! ", DialogLayout.Bottom)
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
let asteroidList: Image[] = []
scene.setBackgroundImage(assets.image`splashScreen`)
game.showLongText("Mission to Hubble", DialogLayout.Bottom)
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("My name is astronaut Kelly Scott", DialogLayout.Bottom)
game.showLongText("\"and I need your help to navigate the space shuttle Discovery to the Hubble Telescope!\"", DialogLayout.Bottom)
game.showLongText("\"use the arrow keys move the Discovery space shuttle around to avoid the asteroid for fifteen seconds!", DialogLayout.Bottom)
startGame()
