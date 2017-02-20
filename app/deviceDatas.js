module.exports = function(io, mysqlPool) {
    io.on('connection', function (socket) {
        socket.on('get_device_datas', function(fn){
            mysqlPool.getConnection(function(err, connection) {
                var query = "SELECT device_types.type_name as device_type, device_data.value, device_data.timestamp from device_data INNER JOIN devices on (devices.device_id = device_data.device_id) INNER JOIN device_types on (device_types.type_id = devices.type_id) order by device_data.timestamp DESC";
                connection.query(query, function(error, rows) {
                    fn(rows);
                    connection.release();
                });
            });
        });
    });
};