import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import '../stylesheets/index.css'
import '../../TinyMCE/js/tinymce/tinymce.min.js';
import '../../TinyMCE/js/tinymce/themes/modern/theme.min.js';
import '../../TinyMCE/js/tinymce/skins/lightgray/content.min.css';
import '../../TinyMCE/js/tinymce/skins/lightgray/skin.min.css';
import '../../TinyMCE/js/tinymce/plugins/advlist/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/autolink/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/lists/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/link/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/image/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/charmap/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/print/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/preview/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/anchor/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/textcolor/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/searchreplace/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/visualblocks/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/code/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/fullscreen/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/insertdatetime/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/media/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/table/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/contextmenu/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/paste/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/help/plugin.min.js';
import '../../TinyMCE/js/tinymce/plugins/dropfile/plugin.min.js';
import '../../TinyMCE/js/tinymce/langs/he_IL.js';


class Editor extends Component {
    constructor() {
        super();

        this.state = {editor: null}
    }

    addDocument(e) {
        e.preventDefault();
        let send = {
            "hello": "<h1>world</h1>"
        };
        axios.post('/pages', send);
    }

    componentWillUnmount() {
        tinymce.remove(this.state.editor);
      }

    componentDidMount() {
        tinymce.init({
            selector : `#text${this.props.passedId}`,
            mode: "exact",
            init_instance_callback: function (editor) {
                // this.setState({editor})

                // Dealing with dropping pictures
                editor.on('DragOver', e=> e.preventDefault());
                // Dealing with the droping content
                editor.on('Drop', function(event) {
                    event.preventDefault();
                    let data = new FormData();
                    const files = event.dataTransfer.files;
                    
                    // Goes through every single file that was chosen and adds it to the data
                    // that will be sent
                    for (let file in files) {
                        data.append(files[file].name, files[file], files[file].name);
                    }
            
                    const config = {
                        headers: { 'content-type': 'multipart/form-data' }
                    }
            
                    // Uploading the pictures to the server
                    const request = axios.post('/pages/images', data, config);
            
                    // Shows the images that were added
                    request.then(result => {
                        // /In case there is a need to define the sizeof pictures
                        // tinyMCE.activeEditor.windowManager.open({
                        //     width:500,
                        //     height:230,

                        // })

                        let updatedContentWithImages = tinyMCE.activeEditor.getContent();
            
                        // Adds the images to the current text with fixed size
                        updatedContentWithImages = result.data.imageUrls.reduce((acu,curr)=>acu + "<img src='" + curr + "' height='200' width='200'/>", updatedContentWithImages);
            
                        // Set the content of the editor
                        tinyMCE.activeEditor.setContent(updatedContentWithImages);
                    })
                });

                // editor.on("NodeChange", function(e) {
                //     console.log("change");
                // })
            },
            height: 150,
            width: 1050,
            branding: false,
            toolbar: "forecolor backcolor",
            resize: 'both',
            directionality : 'rtl',
            language: 'he_IL',
            plugins: [
                'advlist autolink lists link example image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'media table contextmenu paste code help',
            ],
            toolbar: '  example | insert | undo redo | formatselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat'
        });
    }

    render() {
       return (
            <textarea id={`text${this.props.passedId}`} defaultValue={this.props.content}>
            </textarea>
        );
    }
}

export default Editor;