import React, { Component } from "react"
import { Grid, TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"

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
    defaultProps = {
        value: {
            nombre: 'Petición',
            tipo: JsonViewer.Json,
            defaultValue: '',
            elementos: [],
        }
    }
    _onChange = (value,elemento) => {

    }
    render() {
        const { value, onChange } = this.props
        return (
            <Row value={value} onChange={onChange} />
        )
    }
}
function Row({value={}, onChange}) {
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
                    onInputChange={(_,value)=>_onChange('tipos',value)}
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