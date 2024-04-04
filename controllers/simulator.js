const Drawing = require('dxf-writer');
const fs = require('fs');
const axios = require('axios');

exports.getPrice = (req, res) => {
    const surface = req.body.surface;
    const length = req.body.length;
    const steel = req.body.steel;
    const thickness = req.body.thickness;
    const quantity = req.body.quantity;
    const density = req.body.density;
    const weight = calculWeight();
    function calculWeight() {
        return ((surface / 100) * (thickness / 10) * density) * quantity
    }
    const priceSteel = calculPriceSteel();
    function calculPriceSteel() {
        let priceSteel;
        if (steel === 'Acier Standard' && thickness <= 1.5) {
            priceSteel = 135;
            return priceSteel;
        }
        if (steel === 'Acier Standard' && thickness > 1.5 && thickness <= 6) {
            priceSteel = 115;
            return priceSteel;
        }
        if (steel === 'Acier Standard' && thickness > 6 && thickness <= 12) {
            priceSteel = 117;
            return priceSteel;
        }
        if (steel === 'Acier Standard' && thickness > 12) {
            priceSteel = 127;
            return priceSteel;
        }
        if (steel === 'Acier Hardox') {
            priceSteel = 300;
            return priceSteel;
        }
        if (steel === 'Inox Standard') {
            priceSteel = 620;
            return priceSteel;
        }
        if (steel === 'Alu Standard' && thickness <= 12) {
            priceSteel = 700;
            return priceSteel;
        }
        if (steel === 'Alu Standard' && thickness > 12) {
            priceSteel = 750;
            return priceSteel;
        }
    }
    const speed = req.body.speed;
    const pricePerKilosQuote = ((priceSteel * (weight * 1.15) / quantity) / 1000) * quantity;
    const speedTimeQuote = ((60 * length) / speed) * quantity;
    const priceSpeedTimeQuote = (6500 * speedTimeQuote) / 3600;
    const timeInit = calculTimeInit();
    function calculTimeInit() {
        let timeInit;
        if (quantity == 1) {
            timeInit = 1625;
            return timeInit;
        }
        if (quantity == 2) {
            timeInit = 1000 + 1625;
            return timeInit;
        }
        if (quantity >= 3) {
            timeInit = 500 + 1000 + 1625;
            return timeInit;
        }
    }
    const price = Math.ceil(pricePerKilosQuote + priceSpeedTimeQuote + timeInit);
    res.status(200).json(price)
}

exports.createDXF = async (req, res) => {
    let d = new Drawing();
    d.setUnits('Millimeters');
    switch (req.body.shape) {
        case 'circle':
            if (typeof req.body.cx !== 'number' || req.body.cx < 0 || req.body.cx === undefined || req.body.cx === '' ||
                typeof req.body.cy !== 'number' || req.body.cy < 0 || req.body.cy === undefined || req.body.cy === '' ||
                typeof req.body.r !== 'number' || req.body.r < 0 || req.body.r === undefined || req.body.r === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawCircle(req.body.cx, req.body.cy, req.body.r);
            break;
        case 'rectangle':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            break;
        case 'triangle':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [0, req.body.height],
                [0, 0],
            ])
            break;
        case 'corner':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '' ||
                typeof req.body.height2 !== 'number' || req.body.height2 < 0 || req.body.height2 === undefined || req.body.height2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height - req.body.height2],
                [req.body.width - req.body.width2, req.body.height - req.body.height2],
                [req.body.width - req.body.width2, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            break;
        case 'trapeze':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            const spacesLength2 = (req.body.width - req.body.width2)/2
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width2 + spacesLength2, req.body.height],
                [spacesLength2, req.body.height],
                [0, 0],
            ])
            break;
        case 'nick':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '' ||
                typeof req.body.height2 !== 'number' || req.body.height2 < 0 || req.body.height2 === undefined || req.body.height2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            const spacesNickLength2 = (req.body.width - req.body.width2) / 2
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height],
                [req.body.width2 + spacesNickLength2, req.body.height],
                [req.body.width2 + spacesNickLength2, req.body.height - req.body.height2],
                [spacesNickLength2, req.body.height - req.body.height2],
                [spacesNickLength2, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            break;
        case 'rectCircle':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.rcx !== 'number' || req.body.rcx < 0 || req.body.rcx === undefined || req.body.rcx === '' ||
                typeof req.body.rcy !== 'number' || req.body.rcy < 0 || req.body.rcy === undefined || req.body.rcy === '' ||
                typeof req.body.rcr !== 'number' || req.body.rcr < 0 || req.body.rcr === undefined || req.body.rcr === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            d.drawCircle(req.body.rcx, req.body.rcy, req.body.rcr);
            break;
        case 'rectRect':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '' ||
                typeof req.body.height2 !== 'number' || req.body.height2 < 0 || req.body.height2 === undefined || req.body.height2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            const spacesRectLength = (req.body.width - req.body.width2) / 2;
            const spacesRectLargeur = (req.body.height - req.body.height2) / 2;
            d.drawPolyline([
                [spacesRectLength, spacesRectLargeur],
                [spacesRectLength + req.body.width2, spacesRectLargeur],
                [spacesRectLength + req.body.width2, spacesRectLargeur + req.body.height2],
                [spacesRectLength, spacesRectLargeur + req.body.height2],
                [spacesRectLength, spacesRectLargeur]
            ])
            break;
        case 'circleCircle':
            if (typeof req.body.ccx1 !== 'number' || req.body.ccx1 < 0 || req.body.ccx1 === undefined || req.body.ccx1 === '' ||
                typeof req.body.ccx2 !== 'number' || req.body.ccx2 < 0 || req.body.ccx2 === undefined || req.body.ccx2 === '' ||
                typeof req.body.ccy1 !== 'number' || req.body.ccy1 < 0 || req.body.ccy1 === undefined || req.body.ccy1 === '' ||
                typeof req.body.ccy2 !== 'number' || req.body.ccy2 < 0 || req.body.ccy2 === undefined || req.body.ccy2 === '' ||
                typeof req.body.ccr1 !== 'number' || req.body.ccr1 < 0 || req.body.ccr1 === undefined || req.body.ccr1 === '' ||
                typeof req.body.ccr2 !== 'number' || req.body.ccr2 < 0 || req.body.ccr2 === undefined || req.body.ccr2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            d.drawCircle(req.body.ccx1, req.body.ccy1, req.body.ccr1);
            d.drawCircle(req.body.ccx1, req.body.ccy1, req.body.ccr2);
            break;
        case 'cross':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '' ||
                typeof req.body.height2 !== 'number' || req.body.height2 < 0 || req.body.height2 === undefined || req.body.height2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            const littleWIdth = req.body.width - (req.body.width2*2);
            const littleHeight = req.body.height - (req.body.height2 * 2);
            d.drawPolyline([
                [0, req.body.height2],
                [req.body.width2, req.body.height2],
                [req.body.width2, 0],
                [req.body.width2 + littleWIdth, 0],
                [req.body.width2 + littleWIdth, req.body.height2],
                [req.body.width, req.body.height2],
                [req.body.width, req.body.height2 + littleHeight],
                [req.body.width2 + littleWIdth, req.body.height2 + littleHeight],
                [req.body.width2 + littleWIdth, req.body.height],
                [req.body.width2, req.body.height],
                [req.body.width2, req.body.height2 + littleHeight],
                [0, req.body.height2 + littleHeight],
                [0, req.body.height2]
            ])
            break;
        case 'bevel':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.width2 !== 'number' || req.body.width2 < 0 || req.body.width2 === undefined || req.body.width2 === '' ||
                typeof req.body.height2 !== 'number' || req.body.height2 < 0 || req.body.height2 === undefined || req.body.height2 === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            const littleWIdthBevel = req.body.width - (req.body.width2 * 2);
            const littleHeightBevel = req.body.height - (req.body.height2 * 2);
            d.drawPolyline([
                [0, req.body.height2],
                [req.body.width2, 0],
                [req.body.width2 + littleWIdthBevel, 0],
                [req.body.width, req.body.height2],
                [req.body.width, req.body.height2 + littleHeightBevel],
                [req.body.width2 + littleWIdthBevel, req.body.height],
                [req.body.width2, req.body.height],
                [0, req.body.height2 + littleHeightBevel],
                [0, req.body.height2]
            ])
            break;
        case 'hole':
            if (typeof req.body.width !== 'number' || req.body.width < 0 || req.body.width === undefined || req.body.width === '' ||
                typeof req.body.height !== 'number' || req.body.height < 0 || req.body.height === undefined || req.body.height === '' ||
                typeof req.body.distance !== 'number' || req.body.distance < 0 || req.body.distance === undefined || req.body.distance === '' ||
                typeof req.body.hr !== 'number' || req.body.hr < 0 || req.body.hr === undefined || req.body.hr === '') {
                return res.status(400).json({ message: "Une erreur est survenue, veuillez réessayer" });
            }
            const cx1 = req.body.distance + req.body.hr;
            const cx2 = req.body.width - req.body.distance - req.body.hr;
            const cy1 = req.body.distance + req.body.hr;
            const cy2 = req.body.height - req.body.distance - req.body.hr;
            d.drawPolyline([
                [0, 0],
                [req.body.width, 0],
                [req.body.width, req.body.height],
                [0, req.body.height],
                [0, 0],
            ])
            d.drawCircle(cx1, cy2, req.body.hr);
            d.drawCircle(cx1, cy1, req.body.hr);
            d.drawCircle(cx2, cy2, req.body.hr);
            d.drawCircle(cx2, cy1, req.body.hr);
            break;
    }
    const dxfString = d.toDxfString();
    const dxfName = Date.now() + '_DXF.dxf';
    fs.writeFileSync('uploads/' + dxfName, dxfString);

    // For real
    const file = fs.readFileSync('uploads/' + dxfName, { encoding: 'utf-8' });
    let image = await axios.post('https://vector.express/api/v2/public/convert/dxf/cad2svg/svg?cad2svg-unit=mm', file)
    let text = await axios.get(image.data.resultUrl, { responseType: "text" })
    res.send([req.body.shape, text.data, `${req.protocol}://${req.get('host')}/uploads/${dxfName}`])
    
    // For no request to VE
    // const svgTest = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!-- 2023-05-24 15:30:39 Generated by QCAD 3.27.3 SVG Exporter PG -->\n<svg width=\"556mm\" height=\"556mm\" viewBox=\"0 -556 556 556\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" style=\"stroke-linecap:round;stroke-linejoin:round;fill:none\">\n    <g transform=\"scale(1,-1)\">\n        <!-- Circle -->\n        <circle cx=\"278\" cy=\"278\" r=\"278\" style=\"stroke:#000000;stroke-width:0.001;\"/>\n    </g>\n</svg>\n`
    // const nameDXFTest = Date.now() + '_DXF.dxf'
    // const dxfTest = `${req.protocol}://${req.get('host')}/uploads/${nameDXFTest}`
    // res.send([req.body.shape, svgTest, dxfTest])
}