import { sbtrct, makeMed, makeAvr, makeAvl, makeAvf } from '../algos/algebra';
import processECG from '../algos/sigProcessing';

/*
const getExam = () => {
	fetch('http://127.0.0.1:8080/')
		.then((response) => {
			response.text().then((text) => {
				data = text.split("@")

				const Lv1 = String(data[0]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lv2 = String(data[1]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lv3 = String(data[2]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lv4 = String(data[3]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lv5 = String(data[4]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lv6 = String(data[5]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lra = String(data[6]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lla = String(data[7]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
				const Lll = String(data[8]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })

				const med = (makeMed(Lra, Lla, Lll))

				const v1 = (processECG(sbtrct(Lv1, med)))
				const v2 = (processECG(sbtrct(Lv2, med)))
				const v3 = (processECG(sbtrct(Lv3, med)))
				const v4 = (processECG(sbtrct(Lv4, med)))
				const v5 = (processECG(sbtrct(Lv5, med)))
				const v6 = (processECG(sbtrct(Lv6, med)))

				const I = (processECG(sbtrct(Lla, Lra)))
				const II = (processECG(sbtrct(Lll, Lra)))
				const III = (processECG(sbtrct(Lll, Lla)))


				const aVL = (processECG(makeAvl(Array.from(I), Array.from(II))))
				const aVF = (processECG(makeAvf(Array.from(I), Array.from(II))))
				const aVR = (processECG(makeAvr(Array.from(I), Array.from(II))))

				return ({
					v1: v1,
					v2: v2,
					v3: v3,
					v4: v4,
					v5: v5,
					v6: v6,
					I: I,
					II: II,
					III: III,
					aVL: aVL,
					aVF: aVF,
					aVR: aVR,
				})
			})
			console.log((error) => {
				console.log(error)
				return (false)
			})
		})
		.catch((error) => {
			console.log(error)
			return (false)
		})
}
*/

const getExam = () => {
	fetch('http://127.0.0.1:8080/')
		.then(response => response.text())
		.then(text_response => {
			data = text_response.split("@")

			const Lv1 = String(data[0]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lv2 = String(data[1]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lv3 = String(data[2]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lv4 = String(data[3]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lv5 = String(data[4]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lv6 = String(data[5]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lra = String(data[6]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lla = String(data[7]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
			const Lll = String(data[8]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })

			const med = (makeMed(Lra, Lla, Lll))

			const v1 = (processECG(sbtrct(Lv1, med)))
			const v2 = (processECG(sbtrct(Lv2, med)))
			const v3 = (processECG(sbtrct(Lv3, med)))
			const v4 = (processECG(sbtrct(Lv4, med)))
			const v5 = (processECG(sbtrct(Lv5, med)))
			const v6 = (processECG(sbtrct(Lv6, med)))

			const I = (processECG(sbtrct(Lla, Lra)))
			const II = (processECG(sbtrct(Lll, Lra)))
			const III = (processECG(sbtrct(Lll, Lla)))


			const aVL = (processECG(makeAvl(Array.from(I), Array.from(II))))
			const aVF = (processECG(makeAvf(Array.from(I), Array.from(II))))
			const aVR = (processECG(makeAvr(Array.from(I), Array.from(II))))

			console.log({ aVR })
		})
}

export { getExam }
