// import {jsonToFormdata, LOG} from '../../Utils/helperFunction';
// import {showToast} from '../../Utils/toast';

// export const executeApiRequest = async ({
//   apiCallFunction, // The RTK Query mutation/query function
//   body = null, // Request body for POST/PUT requests
//   params = null, // URL parameters or FormData
//   queryParams = {}, // Query string parameters
//   formData = false, // Flag for FormData requests
//   toast = true, // Control toast notifications
//   setStep = null, // Step increment function for multi-step flows
//   timeout = 30000, // Request timeout in milliseconds
// }) => {
//   LOG('executeApiRequest - Input:', {body, params, queryParams});

//   try {
//     // Prepare the request payload
//     let requestPayload;

//     // if (formData) {
//     //   // For FormData requests, use params directly
//     //   requestPayload = jsonToFormdata(params);
//     // } else if (body) {
//     //   // For regular JSON requests with body
//     //   requestPayload = body;
//     // } else if (params) {
//     //   // For requests with just params
//     //   requestPayload = objectToQueryString(params);
//     // }

//     if (formData && body) {
//       requestPayload = jsonToFormdata(body);
//     } else if (body && !formData) {
//       requestPayload = body;
//     } else if (params) {
//       requestPayload = params;
//     } else if (queryParams) {
//       requestPayload = objectToQueryString(queryParams);
//     }

//     LOG('Request payload: ' + requestPayload);

//     // Add queryParams if provided (Note: RTK Query handles this differently)
//     const apiParams =
//       queryParams && Object.keys(queryParams).length > 0
//         ? {...requestPayload, query: queryParams}
//         : requestPayload;

//     // Setup timeout mechanism
//     const timeoutPromise = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error('Request timeout')), timeout),
//     );

//     // Execute API call with timeout
//     const response = await Promise.race([
//       apiCallFunction(apiParams).unwrap(),
//       timeoutPromise,
//     ]);

//     LOG('API Response executeApiRequest:', response, 'success');

//     // Show success toast if enabled
//     if (toast) {
//       showToast(response?.message || 'Success');
//     }

//     // Handle step increment if provided
//     if (setStep) {
//       LOG('setStep triggered', setStep);
//       setStep(prevStep => prevStep + 1);
//     }

//     return Promise.resolve(response);
//   } catch (err) {
//     LOG('API Error executeApiRequest:', err, 'error');

//     // Extract error details
//     const errorMessage =
//       err?.data?.message || err?.message || 'An error occurred';
//     const errorStatus = err?.status || null;

//     // Show error toast if enabled
//     if (toast) {
//       showToast(errorMessage);
//     }

//     // Return rejected promise with detailed error object
//     return Promise.reject({
//       message: errorMessage,
//       status: errorStatus,
//       data: err?.data || null,
//       originalError: err,
//     });
//   }
// };

// Helper function to convert object to query string (if needed)
const objectToQueryString = obj => {
  if (!obj || Object.keys(obj).length === 0) return '';
  return (
    '?' +
    Object.entries(obj)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
  );
};

// Usage examples:
// export const apiExamples = {
//   // Simple GET with query params
//   fetchData: () =>
//     executeApiRequest({
//       apiCallFunction: api.getData,
//       queryParams: {page: 1, limit: 10},
//     }),

//   // POST with body
//   createItem: data =>
//     executeApiRequest({
//       apiCallFunction: api.createItem,
//       body: data,
//       toast: true,
//     }),

//   // FormData upload
//   uploadFile: formData =>
//     executeApiRequest({
//       apiCallFunction: api.uploadFile,
//       params: formData,
//       formData: true,
//       timeout: 60000,
//     }),

//   // Multi-step flow
//   forgotPassword: (email, setStep) =>
//     executeApiRequest({
//       apiCallFunction: api.forgotPassword,
//       body: {email},
//       setStep,
//     }),
// };

// New try
// import {jsonToFormdata, LOG} from '../../Utils/helperFunction';
// import {showToast} from '../../Utils/toast';

// export const executeApiRequest = async ({
//   apiCallFunction, // The RTK Query mutation/query function
//   body = null, // Request body (e.g., JSON or base data for FormData)
//   params = null, // Additional data (e.g., id or other params)
//   queryParams = {}, // Query string parameters
//   formData = false, // Flag for FormData requests
//   toast = true, // Control toast notifications
//   setStep = null, // Step increment function
//   timeout = 30000, // Request timeout in milliseconds
// }) => {
//   LOG('executeApiRequest - Input:', {body, params, queryParams});

//   try {
//     // Prepare the request payload
//     let requestPayload = {};

//     // Handle body and formData
//     if (body) {
//       if (formData) {
//         requestPayload = jsonToFormdata(body); // Convert body to FormData
//       } else {
//         requestPayload = {...body}; // Use body as JSON
//       }
//     }

//     // Merge params into payload (e.g., include id)
//     if (params) {
//       if (formData && requestPayload instanceof FormData) {
//         Object.entries(params).forEach(([key, value]) => {
//           requestPayload.append(key, value); // Append params (e.g., id) to FormData
//         });
//       } else {
//         requestPayload = {...requestPayload, ...params}; // Merge into JSON
//       }
//     }

//     // Handle queryParams
//     let finalParams = requestPayload;
//     if (queryParams && Object.keys(queryParams).length > 0) {
//       if (formData && requestPayload instanceof FormData) {
//         requestPayload.append('query', JSON.stringify(queryParams));
//         finalParams = requestPayload;
//       } else {
//         finalParams = {...requestPayload, query: queryParams};
//       }
//     }

//     // If params contains an id and it's needed in the URL, extract it
//     const id = params?.id || null;
//     const apiParams = id
//       ? {id, body: finalParams} // RTK Query often expects { id, body } for mutations
//       : finalParams;

//     LOG('Request payload:', apiParams);

//     // Setup timeout mechanism
//     const timeoutPromise = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error('Request timeout')), timeout),
//     );

//     // Execute API call with timeout
//     const response = await Promise.race([
//       apiCallFunction(apiParams).unwrap(),
//       timeoutPromise,
//     ]);

//     LOG('API Response executeApiRequest:', response, 'success');

//     if (toast) {
//       showToast(response?.message || 'Success');
//     }

//     if (setStep) {
//       LOG('setStep triggered', setStep);
//       setStep(prevStep => prevStep + 1);
//     }

//     return Promise.resolve(response);
//   } catch (err) {
//     LOG('API Error executeApiRequest:', err, 'error');

//     const errorMessage =
//       err?.data?.message || err?.message || 'An error occurred';
//     const errorStatus = err?.status || null;

//     if (toast) {
//       showToast(errorMessage);
//     }

//     return Promise.reject({
//       message: errorMessage,
//       status: errorStatus,
//       data: err?.data || null,
//       originalError: err,
//     });
//   }
// };
import {jsonToFormdata, LOG} from '../../Utils/helperFunction';
import {showToast} from '../../Utils/toast';

export const executeApiRequest = async ({
  apiCallFunction, // The RTK Query mutation/query function
  body = null, // Request body
  params = null, // Additional params (e.g., id)
  queryParams = {}, // Query string parameters
  formData = false, // Flag for FormData requests
  toast = true, // Control toast notifications
  setStep = null, // Step increment function
  timeout = 30000, // Request timeout in milliseconds
}) => {
  LOG('executeApiRequest - Input-aye:', {body, params, queryParams});

  try {
    // Prepare the request payload
    let requestPayload = {};

    // Handle body and formData
    if (body) {
      if (formData) {
        requestPayload = jsonToFormdata(body); // Convert body to FormData
      } else {
        requestPayload = {...body}; // Use body as JSON
      }
    }

    // Merge params into payload (excluding id for RTK Query structure)
    if (params && params.id) {
      const {id, ...otherParams} = params; // Extract id separately
      console.log('iddd', id);
      console.log('paramsparams', params);

      if (formData && requestPayload instanceof FormData) {
        Object.entries(otherParams).forEach(([key, value]) => {
          requestPayload.append(key, value);
        });
      } else {
        requestPayload = {...requestPayload, ...otherParams};
      }
      // Structure for RTK Query mutation expecting { id, body }
      const apiParams = {
        id,
        body: requestPayload,
        ...otherParams,
      };

      LOG('Request payload for RTK Query:', apiParams);

      // Setup timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout),
      );

      // Execute API call
      const response = await Promise.race([
        apiCallFunction(apiParams).unwrap(),
        timeoutPromise,
      ]);

      LOG('API Response executeApiRequest:', response, 'success');

      if (toast) {
        showToast(response?.message || 'Success');
      }

      if (setStep) {
        LOG('setStep triggered', setStep);
        setStep(prevStep => prevStep + 1);
      }

      return Promise.resolve(response);
    } else {
      // If no id, use requestPayload directly (for queries or mutations without id)
      LOG('Request payload (no id):', requestPayload);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout),
      );

      const response = await Promise.race([
        apiCallFunction(requestPayload).unwrap(),
        timeoutPromise,
      ]);

      LOG('API Response executeApiRequest:', response, 'success');

      if (toast) {
        showToast(response?.message || 'Success');
      }

      if (setStep) {
        LOG('setStep triggered', setStep);
        setStep(prevStep => prevStep + 1);
      }

      return Promise.resolve(response);
    }
  } catch (err) {
    LOG('API Error executeApiRequest:', err, 'error');

    const errorMessage =
      err?.data?.message || err?.message || 'An error occurred';
    const errorStatus = err?.status || null;

    if (toast) {
      showToast(errorMessage);
    }

    return Promise.reject({
      message: errorMessage,
      status: errorStatus,
      data: err?.data || null,
      originalError: err,
    });
  }
};

// This for queryParams
export const executeApiRequestForQueryParams = async ({
  apiCallFunction, // The RTK Query mutation/query function
  body = null, // Request body (JSON or FormData)
  id = null, // Resource ID (e.g., for URL or RTK Query structure)
  queryParams = {}, // Query string parameters (e.g., { filter: 'value' })
  otherParams = {}, // Additional parameters (excluding id)
  formData = false, // Flag for FormData requests
  toast = true, // Control toast notifications
  setStep = null, // Step increment function
  timeout = 30000, // Request timeout in milliseconds
}) => {
  LOG('executeApiRequest - Input:', {body, id, queryParams, otherParams});

  try {
    // Prepare the request payload
    let requestPayload = {};

    // Handle body and formData
    if (body) {
      if (formData) {
        requestPayload = jsonToFormdata(body); // Convert body to FormData
      } else {
        requestPayload = {...body}; // Use body as JSON
      }
    }

    // Merge otherParams into payload (if any)
    if (Object.keys(otherParams).length > 0) {
      if (formData && requestPayload instanceof FormData) {
        Object.entries(otherParams).forEach(([key, value]) => {
          requestPayload.append(key, value);
        });
      } else {
        requestPayload = {...requestPayload, ...otherParams};
      }
    }

    // Structure for RTK Query
    const apiParams = {
      ...(id && {id}), // Include id if provided
      ...(Object.keys(requestPayload).length > 0 && {body: requestPayload}), // Include body if non-empty
      ...queryParams, // Include queryParams for URL query string
    };

    LOG('Request payload for RTK Query:', apiParams);

    // Setup timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout),
    );

    // Execute API call with queryParams handled separately
    const response = await Promise.race([
      apiCallFunction({
        ...apiParams,
        ...(Object.keys(queryParams).length > 0 && {queryParams}), // Pass queryParams explicitly
      }).unwrap(),
      timeoutPromise,
    ]);

    LOG('API Response executeApiRequest:', response, 'success');

    if (toast) {
      showToast(response?.message || 'Success');
    }

    if (setStep) {
      LOG('setStep triggered', setStep);
      setStep(prevStep => prevStep + 1);
    }

    return Promise.resolve(response);
  } catch (err) {
    LOG('API Error executeApiRequest:', err, 'error');

    const errorMessage =
      err?.data?.message || err?.message || 'An error occurred';
    const errorStatus = err?.status || null;

    if (toast) {
      showToast(errorMessage);
    }

    return Promise.reject({
      message: errorMessage,
      status: errorStatus,
      data: err?.data || null,
      originalError: err,
    });
  }
};
