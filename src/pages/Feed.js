import React, { Component } from 'react';
import io from 'socket.io-client';

import api from '../services/Api.js';


import './Feed.css';

//Importação das imagens utilizadas
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';
// console.log ("Feed");

class Feed extends Component {
    //Variável do React que guarda informações para uso posterior no código
    state = {
        feed: [],
    };

    //Executa sempre que o componente é renderizado
    async componentDidMount(){
        //Chamadas em tempo real via Socket
        this.registerToSocket();

        //Chamadas assincronas
        const response = await api.get('posts');
        
        //atualiza o response quando muda a variável feed
        this.setState({ feed: response.data });
    }

    //Função para pegar dados via Socket.io
    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        //Escuta as mensagens de post
        socket.on('newpostSocket', newPost => {
            this.setState({ feed: [newPost,...this.state.feed]});
        })

        //Escuta as mensagens de like
        //percorre todo o objeto feed
        socket.on('newlikeSocket', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    //caso o id do post seja igual o likedpost
                    post._id === likedPost._id ? likedPost : post

                )
            })
        })          
        
    }

    //função para capturar o clique no LIKE (recebe ID)
    //A chamada está sendo feita com "() => this.handleLike(post._id)"
    //por conta da passagem de parâmetros para o react
    handleLike = id => {
        console.log(`/posts/${id}/like`);
        api.post(`/posts/${id}/like`); //Essa rota já foi definida no backend
    }

    render (){ 
        return(
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{ post.author }</span>
                            <span className="place">{ post.place }</span>
                        </div>
                        <img src={more} alt="Mais..." />
                    </header>
                    
                    <img src={ `http://localhost:3333/files/${post.image}`} alt="" /> 

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="Like"/>
                            </button>
                            <img src={comment} alt="Comentar"/>
                            <img src={send} alt="Enviar" />
                        </div>

                        <strong>{ post.likes } Curtidas</strong>
                        <p>
                            { post.description } <br />
                            <span>{ post.hashtags }</span>
                        </p>
                    </footer>
                </article>
                    
                ))}
            </section>
        );
    }
}

export default Feed;