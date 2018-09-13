let app = new Vue({
    el: '#app',
    data: {
        quotes: [],
        email: '',
        password: '',
        failedLogin: false,
        token: null,
        newQuote: '',
        id: ''
    },
    methods: {
        login: function(){
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response =>{
                this.failedLogin = false
                this.email = ''
                this.password = ''
                let token = response.data.token
                let idUser = response.data.id
                this.id = idUser
                this.token = token
                localStorage.setItem('token', token)
            })
            .catch(err =>{
                this.failedLogin = true
            })
        },

        logout: function(){
            this.token = null
            localStorage.clear()
        },
        
        createQuote: function(){
            axios({
                method: 'post',
                url: "http://localhost:3000/quotes",
                data: {
                    status: this.newQuote
                },
                headers: {
                    token: this.token
                }
            })
            .then(response =>{
                let newQuote = response.data
                this.quotes.push(newQuote)
                this.newQuote = ''
            })
        },
        deleteQuote : function(idQuote){
            axios({
                method: 'delete',
                url: `http://localhost:3000/quotes/${idQuote}`,
                headers: {
                    token: this.token
                }
            })
            .then(response =>{
                return axios({
                    method:'get',
                    url:'http://localhost:3000/quotes'
                })
                
            })
            .then(response => {
                this.quotes = response.data
            })
            .catch(err =>{
                alert(JSON.stringify(err))
            })
        },
        translateQuote: function(status){
            // console.log(status)
            axios({
                method: 'post',
                url: 'http://localhost:3000/quotes/translate',
                body: {
                    status: status
                }
            })
            .then(response =>{
                console.log(response)
            })
        }
    }
    ,
    created: function(){
        axios({
            method:'get',
            url:'http://localhost:3000/quotes'
        })
        .then(response=> {
            this.quotes = response.data
        })
        .catch(err =>{
            alert(JSON.stringify(err))
        })
    }

})