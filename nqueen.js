"use strict";

//1辺の長さ
let size;
//置いたクイーンの個数
let queen = 0;
$(document).ready( function(){
    $("#version").text("v2").on("click", () => alert("N-Queen v2.2 / QueenEngine2") );
    $("#size").on("keydown", (e) => {
        if( e.keyCode == 13 ){
            e.preventDefault();
            startQueen();
        };
    });
});
function startQueen() {
    //初期化
    size = $( "#size" ).val();
    queen = 0;
    $( "#num" ).text( queen );
    $( "#result" ).hide().text( "" );
    
    //テーブルを生成
    let append = "", _row = 1, _col = 1;
    for( let i = 1; i < size * size + 1; i++ ) {
        if( i % size == 1 ) append += "<tr>";
        append += `<td id='${i}' data-row='${_row}' data-col='${_col}'></td>`;
        _row ++;
        if( i % size == 0 ) {
            append += "</tr>";
            _col ++; _row = 1;
        }
    }
    document.querySelector("#table").innerHTML = append;

    //ふれると列と行を表示する
    $('td').on('mouseenter', function() {
        document.querySelector("footer").innerHTML = `${this.getAttribute("data-row")}行目${this.getAttribute("data-col")}列目`;
    } );

    //マスをクリック
    $("#table").on("click", "td", function() {
        let row = Number( this.getAttribute("data-row") );
        let col = Number( this.getAttribute("data-col") );
        if( col == 0 ) col = size;
        //赤いところには置けない
        if( $(this).hasClass( "red" ) ) return;
        
        //クイーンの行動範囲を赤く塗る
        //同じ行・同じ列を赤く塗る(飛車)
        let target = document.querySelectorAll("[data-row='"+row+"'], [data-col='"+col+"']");
        target.forEach( (e) => e.classList.add("red") );
        
        //斜めを赤く塗る(角行)
        let sr = (row-1 > size-row ? row-1 : size-row ), sc = (col-1 > size-col ? col-1 : size-col), n = sr < sc ? sr : sc ;
        for( let i=1; i<=n; i++ ){
            target = document.querySelectorAll(`[data-row='${(row-i)}'][data-col='${(col-i)}'],[data-row='${(row+i)}'][data-col='${(col+i)}'],[data-row='${(row+i)}'][data-col='${(col-i)}'],[data-row='${(row-i)}'][data-col='${(col+i)}']`);
            target.forEach( (e) => e.classList.add('red') );
        }
        let redCount = document.querySelectorAll(".red").length;

        this.innerText = "♕";
        queen++;

        document.querySelector('#num').textContent = queen;
        if( queen == size ) {
            $( "#result" ).show().text( size + "クイーンに成功！おめでとうございます！" ).css( "color", "dodgerblue" );
            $( "#tweet" ).attr( "href", "https://twitter.com/intent/tweet?url=http://j.mp/quee-n&text=" + size + "%E3%82%AF%E3%82%A4%E3%83%BC%E3%83%B3%E3%81%AB%E6%88%90%E5%8A%9F%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F" ).show()
            return;
        }
        if( redCount == size * size ) {
            $( "#result" ).show().text( "失敗です。再チャレンジしてください" ).css( "color", "red" );
            return;
        }
    } );
}