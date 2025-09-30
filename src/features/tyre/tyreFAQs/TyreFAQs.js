'use client';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import React, { useState, useMemo, useCallback } from 'react';

const TyreFAQs = ({
  translation,
  faqs,
  headingKey,
  isDynamicTitle,
  brandName,
  faqsError,
  bgColor,
  tractorDealerPayload,
}) => {
  // Memoize heading title with dynamic replacements
  const headingTitle = useMemo(() => {
    let title = tg_getTittleFromNestedKey(translation, headingKey) || '';

    if (isDynamicTitle) {
      // Replace brandName parameter (legacy support)
      if (brandName) {
        title = title.replace('{brandName}', brandName);
      }

      // Replace parameters from tractorDealerPayload
      if (tractorDealerPayload) {
        console.log('TyreFAQs: Original headingTitle:', title);
        console.log('TyreFAQs: tractorDealerPayload:', tractorDealerPayload);

        // Replace {brand_name}
        if (tractorDealerPayload.brand_name) {
          title = title.replace('{brand_name}', tractorDealerPayload.brand_name);
        }

        // Replace {state}
        if (tractorDealerPayload.state) {
          title = title.replace('{state}', tractorDealerPayload.state);
        }

        // Replace {city}
        if (tractorDealerPayload.city) {
          title = title.replace('{city}', tractorDealerPayload.city);
        }

        console.log('TyreFAQs: Final headingTitle after replacements:', title);
      }
    }

    return title;
  }, [translation, headingKey, isDynamicTitle, brandName, tractorDealerPayload]);

  // Memoize formatted FAQs
  const formattedFaqs = useMemo(() =>
    faqs?.map((faq, index) => ({
      id: index,
      question: faq[`ques_${index + 1}`] || '',
      answer: faq[`ans_${index + 1}`] || '',
    })) || [],
    [faqs]
  );

  // State for open rows
  const [openRows, setOpenRows] = useState([0, 1]); // Track open rows

  // Handle toggle functionality
  const handleToggle = useCallback((idx) => {
    const columns = 2;
    const row = Math.floor(idx / columns);

    setOpenRows(prev => {
      if (prev.includes(row)) {
        // Close the whole row
        return prev.filter(r => r !== row);
      } else {
        // Open the whole row
        return [...prev, row];
      }
    });
  }, []);

  // Compute open indexes
  const openIndexes = useMemo(() => {
    const columns = 2;
    const indexes = [];
    for (let i = 0; i < formattedFaqs.length; i++) {
      const row = Math.floor(i / columns);
      if (openRows.includes(row)) indexes.push(i);
    }
    return indexes;
  }, [formattedFaqs.length, openRows]);

  // Early returns for error and empty states
  if (faqsError) {
    return (
      <div className="py-5 text-center">
        <p>{translation?.error_messages?.faqs_unavailable || 'FAQs are currently unavailable.'}</p>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={bgColor || 'bg-white'}>
      <div className="container">
        {headingTitle && (
          <h2 className="border-b-3 mb-8 inline-block border-secondary pb-2 text-2xl font-semibold">
            {headingTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {formattedFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`rounded-lg border ${openIndexes.includes(index)
                  ? 'border-primary bg-green-lighter'
                  : 'border-gray-light bg-white'
                } transition-all duration-300`}
            >
              <button
                onClick={() => handleToggle(index)}
                className="flex w-full items-center justify-between p-4 text-left"
                aria-expanded={openIndexes.includes(index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="text-primary transform transition-transform duration-300">
                  {openIndexes.includes(index) ? '−' : '+'}
                </span>
              </button>

              {openIndexes.includes(index) && (
                <div className="px-4 pb-4">
                  <div
                    className="text-gray-600 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TyreFAQs);