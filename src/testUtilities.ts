// runs code with Date.now stubbed
// cleans up
export const withStubbedNow = (mock: () => number, func: () => void) => {
  try {
    globalThis.Date;

    jest.spyOn(globalThis.Date, 'now').mockImplementation(() => mock());

    func();
  } finally {
  }
};
