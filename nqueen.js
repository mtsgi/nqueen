//1辺の長さ
var size;
//置いたクイーンの個数
var queen = 0;
$(document).ready( function(){
    $("#version").text("v2").on("click", () => alert("N-Queen v2.0 / QueenEngine2") );
});
function startQueen() {
    //初期化
    size = $( "#size" ).val();
    queen = 0;
    $( "#num" ).text( queen );
    $( "#table" ).html( "" );
    $( "#result" ).hide().text( "" );
    
    //テーブルを生成
    var append = "", _row = 1, _col = 1;
    for( let i = 1; i < size * size + 1; i++ ) {
        if( i % size == 1 ) append += "<tr>";
        append += "<td id='" + i + "' data-row='"+_row+"' data-col='"+_col+"'></td>";
        _row ++;
        if( i % size == 0 ) {
            append += "</tr>";
            _col ++; _row = 1;
        }
    }
    $( "#table" ).append( append );

    //ふれると列と行を表示する
    $( "td" ).hover( function() {
        $( "footer" ).text( $(this).attr("data-row") + "行目" + $(this).attr("data-col") + "列目" );
    } );

    //マスをクリック
    $( "td" ).click( function() {
        var row = Number( $(this).attr("data-row") );
        var col = Number( $(this).attr("data-col") );
        if( col == 0 ) col = size;
        //赤いところには置けない
        if( $( this ).hasClass( "red" ) ) return;
        
        //クイーンの行動範囲を赤く塗る
        $("[data-row="+row+"]").addClass( "red" );
        $("[data-col="+col+"]").addClass( "red" );
        let sr = (row-1 > size-row ? row-1 : size-row ), sc = (col-1 > size-col ? col-1 : size-col), n = sr < sc ? sr : sc ;
        for( let i=1; i<=n; i++ ){
            $("[data-row="+(row-i)+"][data-col="+(col-i)+"],[data-row="+(row+i)+"][data-col="+(col+i)+"],[data-row="+(row+i)+"][data-col="+(col-i)+"],[data-row="+(row-i)+"][data-col="+(col+i)+"]").addClass("red");
        }
        var redCount = $("[class=red]").length;

        $( this ).addClass("red");
        $( this ).text("♕");
        queen++;
        $( "#num" ).text( queen );
        if( queen == size ) {
            $( "#result" ).show().text( size + "クイーンに成功！おめでとうございます！" ).css( "color", "dodgerblue" );
            $( "#tweet" ).attr( "href", "https://twitter.com/intent/tweet?url=http://j.mp/n-queen&text=" + size + "%E3%82%AF%E3%82%A4%E3%83%BC%E3%83%B3%E3%81%AB%E6%88%90%E5%8A%9F%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F" ).show()
            return;
        }
        if( redCount == size * size ) {
            $( "#result" ).show().text( "失敗です。再チャレンジしてください" ).css( "color", "red" );
            return;
        }
    } );
}