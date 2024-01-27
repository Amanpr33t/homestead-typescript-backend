import { Router } from 'express';
import { signIn, logout, signup } from '../controllers/field-agent/fieldAgentSignin';
import 'express-async-errors';
//import { forgotPassword, updatePassword, confirmPasswordVerificationToken, resetPasswordVerificationToken } from '../controllers/field-agent/forgotPassword';
//import { addPropertyDealer, propertyDealerEmailExists, propertyDealerContactNumberExists, propertyDealerGstNumberExists, propertyDealerReraNumberExists } from '../controllers/field-agent/addPropertyDealer';
//import { numberOfPropertyDealersAndPropertiesAddedByFieldAgent, propertyDealersAddedByFieldAgent, dealerDetails } from '../controllers/field-agent/propertiesAndPropertyDealersAddedByFieldAgent';
//import { numberOfPendingPropertyReevaluations, pendingPropertiesForReevaluationByFieldAgent, reevaluateProperty } from '../controllers/field-agent/propertyReevaluations';
//import { getProperty } from '../controllers/field-agent/getPropertyDetails';
//import { propertiesAddedByFieldAgent } from '../controllers/field-agent/fetchProperties';
//import { propertyDealerExists, sendOtpToEmailForDealerVerification, confirmOtpForDealerVerification, addAgriculturalProperty, addCommercialProperty, addResidentialProperty } from '../controllers/field-agent/addProperty';
import authenticateFieldAgent from '../middleware/authenticateFieldAgent';
import 'express-async-errors';

const router = Router();

router.post('/signIn', signIn);
router.patch('/logout', authenticateFieldAgent, logout);
router.post('/signUp', signup);
//router.patch('/forgotPassword', forgotPassword);
//router.patch('/updatePassword', updatePassword);
//router.post('/confirmPasswordVerificationToken', confirmPasswordVerificationToken);
//router.patch('/resetPasswordVerificationToken', resetPasswordVerificationToken);

//router.post('/addPropertyDealer', authenticateFieldAgent, addPropertyDealer);
//router.get('/propertyDealerEmailExists', propertyDealerEmailExists);
//router.get('/propertyDealerContactNumberExists', propertyDealerContactNumberExists);
//router.get('/propertyDealerGstNumberExists', propertyDealerGstNumberExists);
//router.get('/propertyDealerReraNumberExists', propertyDealerReraNumberExists);

//router.get('/numberOfPropertyDealersAndPropertiesAddedByFieldAgent', authenticateFieldAgent, numberOfPropertyDealersAndPropertiesAddedByFieldAgent);
//router.get('/propertyDealersAddedByFieldAgent', authenticateFieldAgent, propertyDealersAddedByFieldAgent);
//router.get('/getDealerDetails', authenticateFieldAgent, dealerDetails);
//router.get('/propertiesAddedByFieldAgent', authenticateFieldAgent, propertiesAddedByFieldAgent);
//router.get('/propertyDealerOfaProperty/:id', authenticateFieldAgent, propertyDealerOfaProperty);
//router.get('/numberOfPendingPequestsForReevaluationOfProperty', authenticateFieldAgent, numberOfPendingPropertyReevaluations);
//router.get('/pendingPropertiesForReevaluationByFieldAgent', authenticateFieldAgent, pendingPropertiesForReevaluationByFieldAgent);
//router.get('/getPropertyData', authenticateFieldAgent, getProperty);
//router.post('/reevaluatePropertyData', authenticateFieldAgent, reevaluateProperty);

//router.get('/propertyDealerOtpGeneration', authenticateFieldAgent, propertyDealerExists, sendOtpToEmailForDealerVerification);
//router.get('/propertyDealerOtpVerification', authenticateFieldAgent, confirmOtpForDealerVerification);
//router.post('/addAgriculturalProperty', authenticateFieldAgent, addAgriculturalProperty);
//router.post('/addCommercialProperty', authenticateFieldAgent, addCommercialProperty);
//router.post('/addResidentialProperty', authenticateFieldAgent, addResidentialProperty);

export default router

