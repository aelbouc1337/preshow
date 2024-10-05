export const slideLeft = (id) => {
  const slider = document.getElementById(id);
  slider.scrollLeft = slider.scrollLeft - 500;
};

export const slideRight = (id) => {
  const slider = document.getElementById(id);
  slider.scrollLeft = slider.scrollLeft + 500;
};
