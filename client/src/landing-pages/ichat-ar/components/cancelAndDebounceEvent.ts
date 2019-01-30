const cancelAndDebounce = (fn, time) => {
  let timeout;

  return function(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    ev.stopPropagation();
    const functionCall = () => fn.apply(this, [ev]);
    
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

export default cancelAndDebounce