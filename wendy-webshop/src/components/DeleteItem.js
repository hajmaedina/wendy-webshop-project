export default function DeleteItem({handleDeleteConfirm, deleteModalRef}) {
  return (
    <div className='modal' tabIndex='-1' id='myModal' ref={deleteModalRef}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>TÖRLÉS</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>Biztosan törölni szeretné a kiválasztott terméket?</p>
            <p>Vigyázat: A változásokat nem lehet visszavonni!</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Mégse
            </button>
            <button
              type='button'
              className='btn btn-danger'
              data-bs-dismiss='modal'
              onClick={handleDeleteConfirm}
            >
              Igen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
