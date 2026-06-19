import { useState, useEffect } from 'react'

const Terms = () => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const hasAccepted = localStorage.getItem('termsAccepted')
        if (!hasAccepted) {
            setShowModal(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true')
        setShowModal(false)
    }

    if (!showModal) return null

    return (
        <div className="terms-modal-overlay">
            <div className="terms-modal">
                <h2>Terms and Conditions</h2>
                <div className="terms-content">
                    <p>
                        By using this website, you acknowledge that you have read, understood, and agree to our terms and conditions.
                    </p>

                    <a
                        href="/terms-and-conditions.pdf"
                        download
                        className="terms-link"
                    >
                        Terms and Conditions
                    </a>
                </div>
                <div className="terms-buttons">
                    <button className="accept-btn" onClick={handleAccept}>
                        I Agree
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Terms
