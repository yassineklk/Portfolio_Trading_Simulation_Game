import React from 'react';

const Tile = (props)=>{
    return (
        <div>
            <li class="pb-3 sm:pb-4">
                <button>
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {props.name}
                            </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $320
                        </div>
                    </div>
                </button>
            </li>
        </div>
    );
}

export default Tile;