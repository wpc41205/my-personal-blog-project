import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Delete article', message = 'Do you want to delete this article?' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-[#F9F8F6] rounded-2xl shadow-xl mx-4 w-[477px] h-[256px] pt-4 pr-6 pb-10 pl-6 gap-6 flex flex-col items-center justify-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[#26231E] mb-4">
            {title}
          </h3>
          <p className="text-[#75716B] mb-8">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 w-[138px] h-[48px] border border-[#26231E] text-[#26231E] hover:bg-gray-50 transition-colors font-medium rounded-[999px]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-3 w-[132px] h-[48px] bg-[#26231E] text-white hover:bg-[#3A342E] transition-colors font-medium rounded-[999px]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

