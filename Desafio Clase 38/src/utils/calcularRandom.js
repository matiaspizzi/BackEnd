const calcularRandom = (cant) => {
    const nums = {}
    for (let i = 0; i < cant; i++) {
        const numGen = Math.floor(Math.random() * (1000 - 1)) + 1
        if (!nums[numGen]) {
            nums[numGen] = 1
        }
        nums[numGen]++
    }
    return nums
}

process.on('message', (message) => {
    const nums = calcularRandom(message.cant)
    process.send(nums)
})
