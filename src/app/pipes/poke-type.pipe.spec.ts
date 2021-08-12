import { PokeTypePipe } from './poke-type.pipe';

describe('PokeTypePipe', () => {
  it('create an instance', () => {
    const pipe = new PokeTypePipe();
    expect(pipe).toBeTruthy();
  });
});
