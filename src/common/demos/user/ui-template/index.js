import ElTemplate from './src/template';

/* istanbul ignore next */
ElTemplate.install = function(Vue) {
  Vue.component(ElTemplate.name, ElTemplate);
};

export default ElTemplate;
