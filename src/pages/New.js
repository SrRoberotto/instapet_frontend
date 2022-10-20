import React, { Component } from 'react';
import api from '../services/Api.js';
import './New.css';

class New extends Component {
    //define e armazena o estado dos campos do formulário
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    //função para capturar as mudanças nos dados do formulário
    //preferível usar esse formato para poder acessar o objeto THIS
    //esse método será chamado sempre que um campo for alterado
    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    //Capturar o arquivo de imagens que vem no formato de array
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    //Captura o evento de submit
    handleSubmit = async e => {
        e.preventDefault();
        
        //Processar informações do FORM
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);
        //await api.post('posts', {
        //Se for utilizar apenas JSON
        //});

        //console.log(this.state);

        //Redireciona para uma nova rota
        this.props.history.push('/');
    }

    //Renderização da página
    render (){
        return(
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>

                <input type="text" name="author" placeholder="Autor do post"
                    onChange={this.handleChange} value={this.state.author}/>

                <input type="text" name="place" placeholder="Local do post"
                    onChange={this.handleChange} value={this.state.place}/>

                <input type="text" name="description" placeholder="Descrição do post"
                    onChange={this.handleChange} value={this.state.description}/>

                <input type="text" name="hashtags" placeholder="Hashtags do post"
                    onChange={this.handleChange} value={this.state.hashtags}/>

                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;