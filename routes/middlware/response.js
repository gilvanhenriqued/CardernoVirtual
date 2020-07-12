// function to optimizate the responses
module.exports = function response(res, success=true, msg="", result, status){
  return res
  .status(status)
  .json({
    success: success,
    msg: msg,
    result: result,
    status: status
  });
}