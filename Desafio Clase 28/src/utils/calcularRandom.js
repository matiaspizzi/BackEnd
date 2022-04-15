const calcularRandom = (cant) => {
    const nums = []
    for (let i = 0; i < cant; i++) {
        const numGen = Math.floor(Math.random() * (1000 - 1)) + 1
        if(nums.length == 0){
            nums.push({numero: numGen, repetido: 0})
        } else {
            for (let j = 0; j < nums.length; j++){
                if(nums[j].numero == numGen){
                    nums[j].repetido++
                    break
                } else if(j == nums.length - 1){
                    nums.push({numero: numGen, repetido: 0})
                    break
                }
            }
        }
    }
    return nums
}

process.on('message', (message) => {
    const nums = calcularRandom(message.cant)
    process.send(nums)
})
