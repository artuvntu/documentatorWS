import React, { Component } from "react"
import { Grid, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/**
 * @augments Component<{value:Object, onChange:function}>
 */
export default class JsonViewer extends Component {
    static tipos = {
        Json: 'json',
        Number: 'number',
        String: 'string',
        Date: 'date',
        Boolean: 'bool',
    }
    static defaultProps = {
        value: {
            nombre: 'Petición',
            tipo: JsonViewer.Json,
            defaultValue: '',
            elementos: [],
            color:'lightskyblue'
        }
    }
    _onAdd = () => {
        let { value, onChange } = this.props
        value.elementos.push({
            nombre: 'Petición',
            tipo: JsonViewer.Json,
            defaultValue: '',
            elementos: [],
            color: value.color !== 'lightskyblue' ? 'lightskyblue' : 'lightcoral',
        })
        onChange && onChange(value)
    }
    _onChange = (newValue,item) => {
        let {value, onChange} = this.props;
        value.elementos[item] = newValue;
        onChange && onChange(value)
    }
    render() {
        const { value, onChange } = this.props
        console.log(value);
        if (value.tipo === JsonViewer.tipos.Json) 
            return (
                <ExpansionPanel style={{backgroundColor:value.color}}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Row value={value} onChange={onChange} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{flexDirection:'column'}}>
                        {value.elementos.map((v,i)=><JsonViewer key={i} value={v} onChange={value=>this._onChange(value,i)}/>)}
                        <Button variant="contained"  color="primary" style={{alignSelf:'center',margin:8}} onClick={this._onAdd} >Agregar</Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        
        return (
            <Row value={value} onChange={onChange} />
        )
    }
}
function Row({value={}, onChange, onDelete}) {
    const tipos = Object.values(JsonViewer.tipos)
    const _onChange = (param,v) => {
        value[`${param}`] = v
        onChange && onChange(value)
    }
    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
                <TextField label='Nombre' variant='outlined' value={value.nombre}  onChange={({target:{value}})=>_onChange('nombre',value)} />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    options={tipos}
                    value={value.tipo}
                    freeSolo = {false}
                    onInputChange={(_,value)=>_onChange('tipo',value)}
                    renderInput={params => (
                        <TextField {...params} label='Tipo' variant='outlined'  />
                    )}
                />
            </Grid>
            {value.tipo === JsonViewer.tipos.Json ? null :
            <Grid item xs={4}>
                <TextField label='Default Value' variant='outlined' value={value.defaultValue} onChange={({target:{value}})=>_onChange('defaultValue',value)}/>
            </Grid>
             }
        </Grid>
    )
}