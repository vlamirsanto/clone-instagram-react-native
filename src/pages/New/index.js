import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

// Services
import api from '~/services/api';

// Styles
import styles from './styles';

class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova publicação',
  };

  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    preview: null,
    image: null,
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
      },
      upload => {
        if (upload.error) {
          console.tron.log('Error');
        } else if (upload.didCancel) {
          console.tron.log('User cancel');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          // HEIC
          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          this.setState({preview, image});
        }
      },
    );
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChange={author => this.setState({author})}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={this.state.place}
          onChange={place => this.setState({place})}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChange={description => this.setState({description})}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChange={hashtags => this.setState({hashtags})}
        />

        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default New;
