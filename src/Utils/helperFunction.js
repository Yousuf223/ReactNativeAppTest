import moment from 'moment';
import { useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from './toast';
import { imageServer } from '../Api/configs';
import { appImages } from '../Assets/Images';

/**
 * A generic function to make API requests.
 *
 * @param {function} apiCallFunction - The API call function (e.g. `verifyEmail`, `getUserDetails`, etc.)
 * @param {Object} params - The parameters to pass to the API function (e.g., {email, type}).
 * @param {function} [setStep] - Optional: A callback to handle step changes (for multi-step processes).
 * @returns {Promise<any>} - The response from the API call.
 */
export const makeApiCall = async (apiCallFunction, params, setStep) => {
  LOG('params-makeApiCall', params);
  try {
    const response = await apiCallFunction(params).unwrap();
    LOG('API Response MakeApiCall:', response, 'success');
    showToast(response?.message || 'Success');
    // For Forgot Pass Flow
    if (setStep) {
      console.log('setStep', setStep);

      setStep(prevStep => prevStep + 1);
    }
    return response;
  } catch (err) {
    LOG('API Error MakeApiCall:', err, 'error');
    showToast(err?.data?.message || 'An error occurred');
  }
};

export const jsonToFormdata = data => {
  const formData = new FormData();

  for (let key in data) {
    if (Array.isArray(data[key])) {
      // Agar array gallery ka hai toh image file ke tarah append karo
      if (key === 'gallery') {
        data[key].forEach(item => {
          formData.append(key, {
            uri: item.uri,
            name: item.name,
            type: item.type,
          });
        });
      } else {
        // Kisi aur array ko simple append karna hai
        data[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      }
    } else {
      // Simple key-value append
      formData.append(key, data[key]);
    }
  }

  return formData;
};

export const formatDate = (timestamp, type) => {
  if (!timestamp) {
    return '';
  }
  return type == 'dmy'
    ? moment(timestamp).format('DD MMM YYYY')
    : moment(timestamp).format('DD MMMM YYYY hh:mm A');
};

export const timeAgo = date => {
  const now = new Date();
  const diff = now - new Date(date); // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

export const formattedTime = createdAt => moment(createdAt).format('hh:mm A');

// Define a constant for logging tag to maintain consistency
const TAG = '__API__';

/**
 * A generic function to log messages in development mode.
 *
 * @param {String} label - The label to describe the log message (e.g., "API Response", "Error").
 * @param {Object} data - The data to log (e.g., the response object, error object).
 * @param {String} [type='success'] - The log type; can be 'success' (default), 'error', or 'info'.
 */
export const LOG = (label, data, type = 'success') => {
  if (__DEV__) {
    switch (type) {
      case 'error':
        console.log(`${TAG}❎__${label}__ :`, data);
        break;
      case 'info':
        console.log(`${TAG}ℹ️__${label}__ :`, data);
        break;
      case 'success':
      default:
        console.log(`${TAG}✅__${label}__ :`, data);
        break;
    }
  }
};

/**
 * Debounce function that delays the execution of a given function.
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - A debounced version of the input function.
 */
export const useDebounce = (func, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunction = (...args) => {
    // Clear the previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to invoke the function after the delay
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
};

export const extractFileName = path => {
  return path.substring(path.lastIndexOf('/') + 1);
};

export const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected; // Returns true if connected, false if not
};

/**
 * Get Full Name
 *
 * Purpose:
 * Combines first name and last name into a full name string.
 * If either firstName or lastName is missing or empty, it handles gracefully.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @returns {string} - The full name (firstName + lastName) trimmed properly.
 */
export const getFullName = (firstName = '', lastName = '') => {
  return `${firstName} ${lastName}`.trim();
};

/**
 * Generates the final image source:
 * - If it's a local image, return directly.
 * - If URI is present, build the full dynamic URL.
 * - Otherwise, return placeholder image.
 *
 * @param {string|number} uri - Image URI (string) or local image (require or imported image).
 * @returns {string|number} - Local image require() or full remote URL or placeholder.
 */
// export const getImageUrl = (uri = '') => {
//   if (typeof uri === 'number') {
//     // Local image ke liye direct return kar
//     return uri;
//   }

//   let finalUrl = '';

//   if (uri && uri.startsWith('http')) {
//     finalUrl = uri;
//   } else if (uri) {
//     finalUrl = `${imageServer}${uri.startsWith('/') ? uri : `/${uri}`}`;
//   } else {
//     finalUrl =
//       appImages?.placeholder ||
//       'https://dummyimage.com/600x400/cccccc/000000.jpg&text=No+Image';
//   }

//   // Image compatible return
//   return {uri: finalUrl, priority: Image.priority.high};
// };
export const getImageUrl = (uri = '') => {
  LOG('uri', uri);
  if (!uri) {
    return {
      uri: 'https://dummyimage.com/600x400/cccccc/000000.jpg',
    };
  }

  if (typeof uri === 'number') {
    return uri; // local static image ke liye
  }

  let finalUrl = '';

  if (uri?.startsWith('http')) {
    finalUrl = uri;
  } else {
    finalUrl = `${imageServer}${uri.startsWith('/') ? uri : `/${uri}`}`;
  }

  return { uri: finalUrl };
};


/**
 * Extract Filename from URL
 *
 * Purpose:
 * Extracts the filename from a URL after the 'Uploads/' segment.
 * Handles cases where the URL is invalid or does not contain 'Uploads/' by returning an empty string.
 *
 * @param {string} url - The URL containing the filename (e.g., 'https://react.customdev.solutions:3056/Uploads/1751280207993-302524235.png').
 * @returns {string} - The filename after 'Uploads/' (e.g., '1751280207993-302524235.png') or an empty string if invalid.
 */
export const extractFilenameFromUrl = (url = '') => {
  if (!url || typeof url !== 'string' || !url.includes('Uploads/')) {
    return '';
  }
  const parts = url.split('Uploads/');
  return parts[parts.length - 1] || '';
};