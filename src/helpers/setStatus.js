
export const setStatusFunc = (status) => {
    switch (status) {
        case 400:
            return {
              massage: "You are blocked, please try with another account",
              className: "login__status--warning",
              time:5000
            };
        case 200:
           return {
             massage: "Successfully logged in",
             className: "login__status--success",
             time:2000
           };
        case 404:
            return {
              massage: "User not found, Please, Sign up!",
              className: "login__status--warning",
              time: 5000,
            };
        default:
             return {
               massage: "Username or Password is incorrect",
               className: "login__status--error",
               time: 5000,
             };

   }
}
