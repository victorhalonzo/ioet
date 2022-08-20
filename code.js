"use strict"

var json = [{ "dia": "MO", "hora_inicio": "00:01", "hora_fin": "09:00", "monto": 25 },
{ "dia": "TU", "hora_inicio": "00:01", "hora_fin": "09:00", "monto": 25 },
{ "dia": "WE", "hora_inicio": "00:01", "hora_fin": "09:00", "monto": 25 },
{ "dia": "TH", "hora_inicio": "00:01", "hora_fin": "09:00", "monto": 25 },
{ "dia": "FR", "hora_inicio": "00:01", "hora_fin": "09:00", "monto": 25 },
{ "dia": "MO", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 15 },
{ "dia": "TU", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 15 },
{ "dia": "WE", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 15 },
{ "dia": "TH", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 15 },
{ "dia": "FR", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 15 },
{ "dia": "MO", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 20 },
{ "dia": "TU", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 20 },
{ "dia": "WE", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 20 },
{ "dia": "TH", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 20 },
{ "dia": "FR", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 20 },
{ "dia": "SA", "hora_inicio": "01:00", "hora_fin": "09:00", "monto": 30 },
{ "dia": "SU", "hora_inicio": "01:00", "hora_fin": "09:00", "monto": 30 },
{ "dia": "SA", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 20 },
{ "dia": "SU", "hora_inicio": "09:01", "hora_fin": "18:00", "monto": 20 },
{ "dia": "SA", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 25 },
{ "dia": "SU", "hora_inicio": "18:01", "hora_fin": "00:00", "monto": 25 }];


function calculatePayment(input) {

    var ind = input.indexOf("=");
    var nombre = input.substring(0, ind);
    var input2 = input.substring(ind + 1, input.length);
    var horarios = input2.split(",");
    var mh = 0.00;
    var monto_total = 0.00;

    for (var i = 0; i < horarios.length; i++) {
        var dia = horarios[i].substring(0, 2);
        var ind_g = horarios[i].indexOf("-");
        var hi = horarios[i].substring(2, ind_g);
        var hf = horarios[i].substring(ind_g + 1, horarios[i].length);
        //console.log(dia);
        //console.log(hi);
        //console.log(hf);

        for (var j = 0; j < json.length; j++) {
            debugger;
            var jhi = json[j].hora_inicio;
            var jhf = json[j].hora_fin;
            if (jhf == '00:00') {
                jhf = '24:00';
            }
            if (dia == json[j].dia && hi >= jhi && hf <= jhf) {
                //debugger;
                //console.log(json[j].monto);
                var hi2 = hi.substring(0, 2);
                var hf2 = hf.substring(0, 2);
                var horas = Number(hf2) - Number(hi2);
                var monto_p = horas * json[j].monto;
                monto_total = monto_total + monto_p;
            } else {
                if (dia == json[j].dia && (hi >= jhi && hi <= jhf)) {
                    if (dia == json[j].dia && hi >= jhi && hf > jhf) {
                        //debugger;
                        //console.log(json[j].monto);
                        var hi2 = hi.substring(0, 2);
                        var jhf2 = jhf.substring(0, 2);
                        var horas_i = Number(jhf2) - Number(hi2);
                        var monto_p = horas_i * json[j].monto;
                        monto_total = monto_total + monto_p;
                        for (var k = 0; k < json.length; k++) {
                            var j2hi = json[k].hora_inicio;
                            var j2hf = json[k].hora_fin;
                            if (dia == json[k].dia && hi < j2hi && hf <= j2hf) {
                                var hf2 = hf.substring(0, 2);
                                var jhi2 = j2hi.substring(0, 2);
                                var horas_f = Number(hf2) - Number(jhi2);
                                var monto_p = horas_f * json[k].monto;
                                monto_total = monto_total + monto_p;
                            }
                        }
                    }
                }
            }
        }

    }
    return ("The amount to pay " + nombre + " is: " + monto_total + " USD");
}
