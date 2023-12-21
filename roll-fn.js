// Implementation of https://jcarroll.com.au/2023/10/09/hooray-array/ in functional JS

// library starts
const range = (n) => {
    const a = new Array(n)
    for (let i = 0; i < n; i++) { a[i] = i }
    return a
}
const ap = (funs) => (arr) => {
    let newArr = arr.slice(0)
    for (const fun of funs) { newArr = fun(newArr) }
    return newArr
}
const fmap = (f) => (a) => a.map(f)
const head = (a) => a[0]
const slice = (w) => (a) => (i) => a.slice(i * w, i * w + w)
const slices = (w) => (a) => range(Math.ceil(a.length / w)).map(slice(w)(a))
const reshape = (dims) => ap(dims.map(slices).concat(head))
// library ends

const strjoin = (c) => (a) => a.join(c)
const letters = range(26).map(i => String.fromCharCode(i + 97))
const roll = (l) => (s) => l[Math.floor((Math.random() * l.length * s)) % l.length]

// Reshape
ap([
    fmap(roll(letters)),
    reshape([10, 5]),
    fmap(strjoin('')),
    strjoin('\n')
])(range(50))

// Explicit rows
strjoin('\n')(
    range(5).map(
        () => ap([
            fmap(roll(letters)),
            strjoin('')
        ])(range(10))
    )
)
