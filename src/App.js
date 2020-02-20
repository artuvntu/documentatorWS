import React, {Component} from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';


const useStyles = (theme=>({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LabelInput({name, onChange, value}){
  return (
    <div className='mt-2 mb-2 w-100'>
      <div className='h3' style={{fontWeight:'bold'}} >{name}</div>
      <input className='form-control' value={value} onChange={({target:{value}})=>onChange(value)}  />
    </div>
  )
}
function LabelTextArea({name, onChange, value, disabled=false, textRef}){
  return (
    <div className='mt-2 mb-2 w-100'>
      <div className='h3' style={{fontWeight:'bold'}} >{name}</div>
      <textarea ref={textRef} disabled={disabled} className='form-control' style={{height:'7rem', minHeight:'7rem', maxHeight:'7rem'}} value={value} onChange={({target:{value}})=>onChange && onChange(value)}/>
    </div>
  )
}
class App extends Component {

  constructor(p) {
    super(p)
    this.state = {
      openAlert: false,
      title: 'Catalogo',
      description: 'Devuelve una lista de catalogos',
      consideration: 'Validara que el correo electrónico no exista. Si es así registrara el usuario con un tipo de usuario cliente y regresara el\n\nestatus 0 y el id del usuario registrado. De otro modo mostrará el estatus 1.\n\nLas tablas relacionadas son Usuarios, TipoUsuarios, Estados.',
      method: 'POST',
      tipo: 'application/json',

    }
  }


  _getMarkFormat() {
    const { title, description, consideration, method, tipo } = this.state
    return '' +
      (title && `# ${title} \n`) +
      (description && `***\n> ${description} \n*** \n` )+
      (consideration && `## Consideraciones: \n\n*** \n\n${consideration}\n\n***\n`) +
      ((method || tipo) && (`Datos de la petición | \n --------|------\n`)) +
      (method && `Metodo|${method}\n`) +
      (tipo && `Tipo|${tipo}\n`)

    
  }

  _onCopiarButton = () => {
    this.area.select()
    document.execCommand('copy')
    this.setState({openAlert:true})
  }
  _onCloseAlert = () => this.setState({openAlert:false})
  render() {
    const { title, description, consideration, openAlert, method, tipo } = this.state
    const { classes } = this.props;
    const metodosComunes = ['POST','GET'];
    const tiposComunes = ['application/json'];
    return (
      <div className='content-main'>
        <div className='row'>
          <div className='col-lg-6 col-sm-12' >
              <div className={classes.root} >
              <TextField multiline={true} style={{width:'100%'}} label="Titulo" variant="outlined" value={title} onChange={({target:{value}})=>this.setState({title:value})} />
              <TextField multiline={true} style={{width:'100%'}} label="Descripción" variant="outlined" value={description} onChange={({target:{value}})=>this.setState({description:value})} />
              <TextField multiline={true} style={{width:'100%'}} label="Consideraciones" variant="outlined" value={consideration} onChange={({target:{value}})=>this.setState({consideration:value})} />
              <div className='d-flex'>
                <Autocomplete
                  options={metodosComunes}
                  renderInput={params => (
                    <TextField {...params} label="Metodo" variant="outlined" fullWidth />
                  )}
                />
                <Autocomplete
                  options={tiposComunes}
                  value={tipo}
                  freeSolo
                  renderInput={params => (
                    <TextField {...params} label="Tipo" variant="outlined" fullWidth  />
                  )}
                />
              </div>
              </div>
          </div>
          <div className='col-lg-6 col-sm-12 d-flex align-items-start justify-content-start flex-column' >
            <Button variant="contained" color="primary"style={{alignSelf:'center'}} onClick={this._onCopiarButton} >Copiar</Button>
            <ReactMarkdown
              className='p-2'
              source={this._getMarkFormat()}
            />
            <LabelTextArea className='w-100' name={'Vista cruda'} value={this._getMarkFormat()} textRef={e=>this.area = e} />
          </div>
        </div>
        <Snackbar open={openAlert} autoHideDuration={1000} onClose={this._onCloseAlert}>
          <Alert onClose={this._onCloseAlert} severity="success">Copiado</Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
