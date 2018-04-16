
export function add (data) {
  return {
    type: 'add',
    data
  }
}

export function sub (data) {
  return (dispatch) => {
    dispatch({
      type: 'sub',
      data
    })
  }
}
