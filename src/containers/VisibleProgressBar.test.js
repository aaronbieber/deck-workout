const rewire = require("rewire")
const VisibleProgressBar = rewire("./VisibleProgressBar")
const mapStateToProps = VisibleProgressBar.__get__("mapStateToProps")
const mapDispatchToProps = VisibleProgressBar.__get__("mapDispatchToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ workout: { drawCount: 1, deck: false, draw: 0, discard: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ workout: { drawCount: -100, deck: false, draw: -5.48, discard: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ workout: { drawCount: 0, deck: true, draw: -5.48, discard: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ workout: { drawCount: 1, deck: true, draw: -100, discard: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ workout: { drawCount: 0, deck: false, draw: -5.48, discard: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("mapDispatchToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapDispatchToProps("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapDispatchToProps(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapDispatchToProps("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapDispatchToProps(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapDispatchToProps("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapDispatchToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
