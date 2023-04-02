import { bresenham, DDA, PMD } from "./functions.js";

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let inicio = new Date();

    for(let i=0; i<1000; i++)
    {
        PMD(0, i, 1000, i, ctx);
    }

    for(let i=0; i<1000; i++)
    {
        PMD(1000, i, 0, i, ctx);
    }

    for(let i=0; i<1000; i++)
    {
        PMD(i, 0, i, 1000, ctx);
    }

    for(let i=0; i<1000; i++)
    {
        PMD(i, 1000, i, 0, ctx);
    }

    for(let i=0; i<1000; i++){
        PMD(0,i, i,0, ctx);
        PMD(i,1000, 1000,i, ctx);
    }

    for(let i=0; i<1000; i++){
        PMD(i,0, 0,i, ctx);
        PMD(1000,i, i,1000, ctx);
    }

    var aux = 1000;

    for(let i=0; i<1000; i++){
        aux -= i;
        PMD(1000,i, aux,0, ctx);
        PMD(aux,1000, 0,i, ctx);
    }

    for(let i=0; i<1000; i++){
        aux -= i;
        PMD(1000,i, aux,0, ctx);
        PMD(aux,1000, 0,i, ctx);
    }
    aux = 1000;
    for(let i=0; i<1000; i++){
        aux -= i;
        PMD(i,0, aux,0, ctx);
        PMD(1000,aux, i,0, ctx);
    }
    aux = 1000;
    for(let i=0; i<1000; i++){
        aux -= i;
        PMD(aux,0, 1000,aux, ctx);
        PMD(0,aux, aux,0, ctx);
    }


    // for(let i=0; i<1000; i++){
    //     bresenham(0,i, i,0, ctx);
    //     bresenham(i,1000, 1000,i, ctx);
    // }

    let final = new Date();
    let tiempo = final - inicio;
    console.log("Tiempo: " + tiempo);