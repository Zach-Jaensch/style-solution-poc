const debounce = (func: (...args: any[]) => void, wait = 200) => {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: any[]) => {
    const later = () => {
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
};

export default debounce;
