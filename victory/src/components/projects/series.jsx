import React, {useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Series = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
};

const SpringModal = ({ isOpen, setIsOpen }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-green2-200 to-ore2-700 text-white p-5 rounded-lg w-1/4 h-fit relative overflow-hidden"
            >
              <h1 className="mb-3 ml-20 ">PLANS</h1>
              <div className="relative z-10">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your plan"
                    name="plan"
                    className="mt-1 w-72 border-4 border-ore2-700 rounded-lg p-1 text-black"
                    onChange={(e) => setPlan(e.target.value)}
                  />
                  <button
                    onClick={addplan}
                    className="bg-white mt-3 ml-20 hover:opacity-90 text-lg transition-opacity text-indigo-600 font-semibold w-32 p-1 rounded"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

export default Series
