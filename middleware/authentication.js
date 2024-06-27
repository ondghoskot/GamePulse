export default async function ({ $axios, store, env, redirect, app, $auth, route}) {
   if (['login', 'register'].includes(route.name)) return
  let $cookie = env.SSO_COOKIE_NAME;
  if (app.$cookies.get($cookie)) {
  console.log(env.SSO_COOKIE_NAME)

    // store.commit("setToken", app.$cookies.get($cookie));
    // $auth.setToken(app.$cookies.get($cookie));
    // let axiosInstance = $axios.create();
    // $auth.setUser(
    //     JSON.parse(atob(app.$cookies.get(env.SSO_COOKIE_NAME).split(".")[1]))
    // );
    // $axios.setToken(app.$cookies.get($cookie), "Bearer");

    // await $axios
    //   .$get( "/fetchUser" + $auth.user.sub)
    //   .then((res) => {
    //     store.commit("setUserData", res);
    //   });
        

 
  } else {
    return redirect('/login');
  }
}
