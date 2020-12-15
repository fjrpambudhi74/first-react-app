import React, { Component } from 'react'
import BlogList from '../../components/BlogList'
import './Blog.css'
import axios from 'axios'

class Blog extends Component {
    //state component yang menampung data dari api
    state = {
        post: [],
        form: {
            id: 1,
            userId: 1,
            title: '',
            body: ''
        },
        isUpdate: false
    }

    // GET API
    // Method Get API dipisah diluar lifecycle agar bisa dipanggil ke method lainnya
    getApi = () => {
        axios.get('http://localhost:4000/posts?_sort=id&_order=desc')
            .then((res) => {
                this.setState({
                    post: res.data
                })
                console.log(res.data)
            })
    }

    //Post Data to API
    postApi = () => {
        axios.post('http://localhost:4000/posts', this.state.form)
            .then((res) => {
                console.log(res)
                this.getApi();
            }, (err) => {
                console.log(err)
            })
    }

    // Update Data From API
    putApi = () => {
        axios.put(`http://localhost:4000/posts/${this.state.form.id}`, this.state.form)
            .then((res) => {
                console.log(res)
                this.getApi();
                this.setState({
                    isUpdate: false, //setelah melakukan update/put maka akan dikembalikan ke kondisi awal yaitu method post
                    form: { //Mereset data form ke state awal
                        id: 1,
                        userId: 1,
                        title: '',
                        body: ''
                    },
                })
            })
    }

    //Handle Update Method
    handleUpdate = (data) => {
        console.log(data)
        this.setState({ //Merubah form di state menjadi data yang pilih oleh event
            form: data,
            isUpdate: true
        })

    }

    // Handle Remove Method Delete from API
    handleRemove = (data) => {
        console.log(data)
        axios.delete(`http://localhost:4000/posts/${data}`)
            .then((res) => {
                this.getApi(); //Panggil data kembali setelah method remove selesai dieksekusi
            })
    }

    handleForm = (event) => { //event fungsinya untuk mentrigger ketika sebuah nilai dimasukan ke form
        let newForm = { ...this.state.form } //membuat varibel baru utk mencopy value yang sama dengan state
        let timestamp = new Date().getTime(); //memanggil fungsi date time
        // newForm['id'] = timestamp; //mengenerate id unik menjadi date time
        if (!this.state.isUpdate) { //ketika update data id akan tetap tidak berubah dan jika false maka membuat id baru
            newForm['id'] = timestamp;
        }
        newForm[event.target.name] = event.target.value; //ketika value dimasukan dimasing2 input maka akan tercopy ke variable newForm sesuai target name nya
        this.setState({
            form: newForm
        })
    }

    handleSubmit = (e) => {
        if (this.state.isUpdate) {
            this.putApi();
        } else {
            this.postApi();
            this.setState({ //Mereset data form ke state awal
                form: {
                    id: 1,
                    userId: 1,
                    title: '',
                    body: ''
                },
            })
        }
        e.preventDefault();
    }

    //Lifecycle Mounting
    componentDidMount() {
        this.getApi(); //Method Get Api di mounting di lifecycle setelah dirender
        // window.addEventListener('click', this.handleSubmit);
    }

    render() {
        return (
            <div>
                <h1 className="header">Fake Rest API</h1>
                <form >
                    <div className="name">
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.form.title} onChange={this.handleForm} />
                    </div>

                    <div className="message">
                        <label >Description</label>
                        <textarea cols="40" rows="8" name="body" value={this.state.form.body} onChange={this.handleForm}></textarea>
                    </div>

                    <div className="submit">
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    </div>
                </form>
                {
                    this.state.post.map(post => { //setelah data terpanggil lalu dimap agar terbaca ke components
                        return <BlogList
                            key={post.id}
                            data={post} //data yang dikirim berupa paramater post ke child comp
                            remove={this.handleRemove} //menangkap event
                            update={this.handleUpdate} /> //menangkap aksi yang ditrigger dari child comp lalu di lempar ke method
                    })
                }
            </div>
        )
    }
}

export default Blog;