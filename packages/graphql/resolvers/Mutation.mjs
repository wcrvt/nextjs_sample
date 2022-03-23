export const Mutation = {

	samples: (_parent, _argument, _context ) => {
    let t = 0;
    const ts = 1e-3;
    const x = [];
    const amplitude = [];
    const frequency = [];
    const phase = [];
    for(let i = 0; i < 4; i++){
      x[i] = [];
      amplitude[i] = 2.0 * Math.random();
      frequency[i] = 4.0 * Math.random() + 1.0;
      phase[i] = 2.0 * Math.PI * Math.random();
    }
    for (let i = 0; i < 1000; i++) {
      x[0].push(t);
      for (let j = 1; j < 4; j++) {
        x[j].push(amplitude[j] * Math.sin(2.0 * Math.PI * frequency[j] * (t + phase[j])));
      }
      t += ts;
    }
    return x;
	},


}