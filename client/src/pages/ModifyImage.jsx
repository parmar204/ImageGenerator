import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'; 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const ModifyImage = () => {

    const {loadCreditData} = useAppContext()

    const [imageFile, setImageFile] = useState(assets.sample_img_1)
    const [showModificationState, setShowModificationState] = useState(false)
    const [prompt, setPrompt] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageFileName, setImageFileName] = useState(null)

    const handleModifyimage = async () => {
        setIsLoading(true);
        setShowModificationState(true)
        try {
            if (!prompt || !imageFileName || imageFile === assets.sample_img_1) {
                toast.error('Please provide both an image and a prompt.')
                setIsLoading(false)
                setShowModificationState(false)
                return;
            }

            const formData = new FormData()
            formData.append('prompt', prompt)
            formData.append('image', imageFileName)

            const { data } = await axios.post('/api/user/modify-image', formData)
            if (data.success) {
                setGeneratedImageUrl(data.imageUrl)
                toast.success("Image modified successfully")
                setPrompt('')
                setIsLoading(false)
                loadCreditData()
            } else {
                toast.error(data.message || 'Failed to modify image')
                setIsLoading(false)
                setShowModificationState(false)
                loadCreditData()
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoading(false)
            setShowModificationState(false)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setImageFileName(file)
        setImageFile(URL.createObjectURL(file))
    }

    const handleDownloadImage = () => {
        if (!generatedImageUrl) {
            toast.error('No image to download')
            return
        } 

        const link = document.createElement('a')
        link.href = generatedImageUrl
        link.download = `modified_image_${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

  return (
    <section className='min-h-screen bg-gray-100 flex items-center justify-center p-2'>
        <div className='bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8'>
            {/* First Section: Image Upload, Prompt, and Modify Button */}
            <motion.div animate={showModificationState ? { scale: 1.05, rotate: 1 } : { scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 100, damping: 10 }} className={`flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-500`}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Modify Your Image</h2>

                <div className="mb-6 w-full max-w-[400px] h-[300px] flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                    <img
                    src={imageFile}
                    alt="Sample"
                    className="w-full h-full rounded-lg"
                    />
                </div>

                <label htmlFor="image-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mb-4">
                    Upload Image
                    <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    />
                </label>

                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows="4"
                    placeholder="Describe how you want to modify the image (e.g., 'Add a futuristic city in the background', 'Change the sky to sunset colors')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>

                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={isLoading || !prompt}
                    onClick={handleModifyimage}
                >
                    {isLoading ? 'Generating...' : 'Modify Image'}
                </button>
            </motion.div>

            {/* Second Section: Modified Image and Download Button */}

            {showModificationState && (
                <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-500 md:w-1/2'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Modified Image</h2>
                    {/* Modified Image Display */}
                    <div className='mb-6 w-full max-w-[400px] h-[300px] flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden'>
                        {isLoading ? (
                            <div className='flex flex-col items-center'>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                <p className="mt-2 text-gray-600">Generating image...</p>
                            </div>
                        ) : (
                            <img src={generatedImageUrl} alt="Modified" className="w-full h-full rounded-lg" />
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadImage}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        disabled={!generatedImageUrl}
                    >
                        Download Image
                    </motion.button>
                </motion.div>
            )}
        </div>
    </section>
  )
}

export default ModifyImage