module.exports = {
  routes: [
    {
      name: 'countryzone',
      path: '/baseapp/countryzone',
      component: './src/countryzone-info.vue'
    },
    {
      name: 'countryzone',
      path: '/baseapp/countryzone/add',
      component: './src/countryzone-detail.vue'
    },
    {
      name: 'countryzone',
      path: '/baseapp/countryzone/edit/:id',
      component: './src/countryzone-detail.vue'
    },
  ]
}
