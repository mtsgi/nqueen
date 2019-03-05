//1辺の長さ
var size;
//置いたクイーンの個数
var queen = 0;
function startQueen() {
    //初期化
    size = $( "#size" ).val();
    queen = 0;
    $( "#num" ).text( queen );
    $( "#table" ).html( "" );
    $( "#result" ).hide().text( "" );
    //テーブルを生成
    var append = "";
    for( var i = 1; i < size * size + 1; i++ ) {
        if( i % size == 1 ) append += "<tr>";
        append += "<td id='" + i + "'></td>";
        if( i % size == 0 ) append += "</tr>";
    }
    $( "#table" ).append( append );
    //ふれると列と行を表示する
    $( "td" ).hover( function() {
        var row = Math.floor( Number( this.id - 1 ) / size ) + 1;
        var col = Number( this.id ) % size;
        if( col == 0 ) col = size;
        $( "footer" ).text( row + "行目" + col + "列目" );
    } );
    //マスをクリック
    $( "td" ).click( function() {
        var masu = Number( this.id );
        var row = Math.floor( Number( this.id - 1 ) / size ) + 1;
        var col = Number( this.id ) % size;
        if( col == 0 ) col = size;
        //赤いところには置けない
        if( $( this ).hasClass( "red" ) ) {
            alert( "そこには置けないよ！" );
            return;
        }
        //クイーンの行動範囲を赤く塗る
        var redCount = 0;
        for( i in $( "td" ) ) {
            var k = ( Number( i ) + 1 );
            //同じ行を赤くする
            var k_row = Math.floor( ( k - 1 ) / size ) + 1
            if( k_row == row ) {
                $( "#" + k ).addClass( "red" );
            }
            //同じ列を赤くする
            var k_col = k % size
            if( k_col == 0 ) k_col = size;
            if( k_col == col ) {
                $( "#" + k ).addClass( "red" );
            }
            //ななめ
            for( n = 1; n < size; n++ ) {
                if( k_row == row + n && k_col == col + n ) $( "#" + k ).addClass( "red" );
                else if( k_row == row + n && k_col == col - n ) $( "#" + k ).addClass( "red" );
                else if( k_row == row - n && k_col == col + n ) $( "#" + k ).addClass( "red" );
                else if( k_row == row - n && k_col == col - n ) $( "#" + k ).addClass( "red" );
            }
            //赤いマス数カウント
            if( $( "#" + k ).hasClass( "red" ) ) redCount++;
        }
        $( this ).addClass( "red" );
        $( this ).text( "♕" );
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