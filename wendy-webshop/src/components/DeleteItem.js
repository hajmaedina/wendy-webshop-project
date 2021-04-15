export default function DeleteItem({handleDeleteConfirm, deleteModalRef}) {
  return (
    <div className='modal' tabIndex='-1' id='myModal' ref={deleteModalRef}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>REMOVE</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>Are you sure to remove the product from the list?</p>
            <p>Warning: Changes can not be undone!</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              NO
            </button>
            <button
              type='button'
              className='btn btn-orange'
              data-bs-dismiss='modal'
              onClick={handleDeleteConfirm}
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
