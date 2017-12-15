import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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


class Editor extends Component {
    constructor() {
        super();

        this.renderDocumentTextEditor = this.renderDocumentTextEditor.bind(this);
    }

    addDocument() {

    }

    componentDidMount() {
        tinymce.init({
            selector: 'textarea',
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code help'
            ],
            toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
        });
    }

    renderDocumentTextEditor(field) {
        return (
            <textarea>
                <h1>hi</h1>
            </textarea>
        );
    }

    render() {
        return (
            <form>
                <Field
                    name = "documentText"
                    component = {this.renderDocumentTextEditor}
                 />

                <button onClick={this.addDocument}>הוסף!</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newDocumentForm'
})(Editor);